import { bookingApi } from "@/entities/booking";
import { useState, useCallback } from "react";

interface UseBookingPaymentProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useBookingPayment = ({
  onSuccess,
  onError,
}: UseBookingPaymentProps = {}) => {
  const [processing, setProcessing] = useState<string | null>(null);

  const processPayment = useCallback(
    async (bookingId: string) => {
      try {
        setProcessing(bookingId);
        await bookingApi.createPayment(bookingId);
        onSuccess?.();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Ошибка при оплате. Попробуйте позже.";
        onError?.(errorMessage);
        console.error(`Ошибка при обработке бронирования ${bookingId}:`, err);
      } finally {
        setProcessing(null);
      }
    },
    [onSuccess, onError],
  );

  const cancelBooking = useCallback(
    async (bookingId: string) => {
      try {
        setProcessing(bookingId);
        await bookingApi.cancelBooking(bookingId);
        onSuccess?.();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Ошибка при отмене бронирования.";
        onError?.(errorMessage);
        console.error(`Ошибка при отмене брованирования ${bookingId}:`, err);
      } finally {
        setProcessing(null);
      }
    },
    [onSuccess, onError],
  );

  return {
    processing,
    processPayment,
    cancelBooking,
  };
};
