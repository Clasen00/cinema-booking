import { useState, useEffect, useCallback, useMemo } from "react";
import { groupBookingsByStatus } from "../utils/groupBookingsByStatus";
import { calculateRemainingTime } from "../utils/calculateRemainingTime";
import { useSettings } from "./useSettings";
import bookingApi from "@/entities/booking/api/bookingsApi";
import type { Booking } from "@/entities/booking/model/types";

export const useUserBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { settings, loading: settingsLoading } = useSettings();

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await bookingApi.getUserBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить ваши билеты. Попробуйте позже.");
      console.error("Ошибка при загрузке билетов:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Проверяем истекшие неоплаченные бронирования
  useEffect(() => {
    if (!settings || bookings.length === 0) return;

    const expiredBookings = bookings.filter((booking) => {
      if (booking.isPaid) return false;

      const remainingTime = calculateRemainingTime(
        booking.bookedAt,
        settings.bookingPaymentTimeSeconds,
      );

      return remainingTime !== null && remainingTime <= 0;
    });

    if (expiredBookings.length > 0) {
      // Автоматически обновляем список, удаляя истекшие
      setBookings((prev) =>
        prev.filter(
          (booking) =>
            !expiredBookings.some((expired) => expired.id === booking.id),
        ),
      );
    }
  }, [bookings, settings]);

  // Группируем бронирования по статусу
  const { unpaid, upcoming, past } = useMemo(() => {
    return groupBookingsByStatus(bookings, settings?.bookingPaymentTimeSeconds);
  }, [bookings, settings]);

  // Обновление каждую секунду для таймеров
  useEffect(() => {
    if (unpaid.length === 0) return;

    const interval = setInterval(() => {
      setBookings((prev) => [...prev]); // Форсируем ре-рендер для обновления таймеров
    }, 1000);

    return () => clearInterval(interval);
  }, [unpaid.length]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    unpaid,
    upcoming,
    past,
    loading: loading || settingsLoading,
    error,
    refetch: fetchBookings,
  };
};
