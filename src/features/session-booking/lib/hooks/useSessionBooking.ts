import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/lib/hooks/useAuth";
import { useSeatSelection } from "./useSeatSelection";
import sessionsApi from "@/entities/session/api/sessionsApi";
import type { MovieSessionDetails } from "@/entities/session/model/types";

export const useSessionBooking = (sessionId?: string) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [session, setSession] = useState<MovieSessionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<boolean>(false);

  const {
    selectedSeats,
    handleSeatClick: handleSeatSelection,
    clearSelection,
  } = useSeatSelection();

  const fetchSessionDetails = useCallback(async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const data = await sessionsApi.getSessionById(sessionId);
      setSession(data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить информацию о сеансе. Попробуйте позже.");
      console.error("Ошибка при загрузке сеанса:", err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const handleSeatClick = useCallback(
    (row: number, seat: number) => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      if (
        session?.bookedSeats?.some(
          (s) => s.rowNumber === row && s.seatNumber === seat,
        )
      ) {
        return;
      }

      handleSeatSelection(row, seat);
    },
    [isAuthenticated, navigate, session, handleSeatSelection],
  );

  const handleBooking = useCallback(async () => {
    if (!sessionId || !isAuthenticated) {
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Пожалуйста, выберите хотя бы одно место");
      return;
    }

    try {
      setBooking(true);
      await sessionsApi.bookSeats(sessionId, selectedSeats);
      navigate("/my-tickets");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Не удалось забронировать места. Попробуйте позже.",
      );
      console.error("Не удалось забронировать места:", err);
    } finally {
      setBooking(false);
    }
  }, [sessionId, isAuthenticated, navigate, selectedSeats]);

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId, fetchSessionDetails]);

  return {
    session,
    loading,
    error,
    selectedSeats,
    isAuthenticated,
    booking,
    handleSeatClick,
    handleBooking,
    refetch: fetchSessionDetails,
    clearSelection,
  };
};
