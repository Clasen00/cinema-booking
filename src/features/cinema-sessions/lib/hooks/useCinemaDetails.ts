import { cinemaApi } from "@/entities/cinema";
import type { Cinema, MovieSession } from "@/entities/cinema";
import { useState, useEffect, useCallback } from "react";

export const useCinemaDetails = (id?: string) => {
  const [cinema, setCinema] = useState<Cinema | null>(null);
  const [sessions, setSessions] = useState<MovieSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCinemaDetails = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [cinemaData, sessionsData] = await Promise.all([
        cinemaApi.getCinemaById(id),
        cinemaApi.getCinemaSessions(id),
      ]);
      setCinema(cinemaData);
      setSessions(sessionsData);
      setError(null);
    } catch (err) {
      setError(
        "Не удалось загрузить информацию о кинотеатре. Попробуйте позже.",
      );
      console.error("Ошибка при загрузке кинотеатра:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCinemaDetails();
    }
  }, [id, fetchCinemaDetails]);

  return {
    cinema,
    sessions,
    loading,
    error,
    refetch: fetchCinemaDetails,
  };
};
