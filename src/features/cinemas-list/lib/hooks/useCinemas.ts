import { cinemaApi, type Cinema } from "@/entities/cinema";
import { useState, useEffect, useCallback } from "react";

export const useCinemas = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCinemas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cinemaApi.getCinemas();
      setCinemas(data);
      setError(null);
    } catch (error) {
      setError("Не удалось загрузить кинотеатры. Попробуйте позже.");
      console.error("Не удалось загрузить кинотеатры:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCinemas();
  }, [fetchCinemas]);

  return {
    cinemas,
    loading,
    error,
    refetch: fetchCinemas,
  };
};
