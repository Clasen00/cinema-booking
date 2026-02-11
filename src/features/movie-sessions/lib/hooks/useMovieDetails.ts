import { movieApi } from "@/entities/movie";
import { type MovieSession } from "@/entities/session";
import type { Movie } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useMovieDetails = (id?: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [sessions, setSessions] = useState<MovieSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [movieData, sessionsData] = await Promise.all([
        movieApi.getMovieById(id),
        movieApi.getMovieSessions(id),
      ]);
      setMovie(movieData);
      setSessions(sessionsData);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить информацию о фильме. Попробуйте позже.");
      console.error("Не удалось загрузить информацию о фильме:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id, fetchMovieDetails]);

  return {
    movie,
    sessions,
    loading,
    error,
    refetch: fetchMovieDetails,
  };
};
