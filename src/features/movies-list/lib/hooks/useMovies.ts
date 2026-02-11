import movieApi from "@/entities/movie/api/movieApi";
import type { Movie } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface UseMoviesOptions {
  searchQuery?: string;
  genre?: string;
}

export const useMovies = (options: UseMoviesOptions = {}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);

      const data = await movieApi.getMovies();
      setMovies(data);
      setFilteredMovies(data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить фильмы. Попробуйте позже.");
      console.error("Не удалось загрузить фильмы:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Фильтрация фильмов на клиенте
  useEffect(() => {
    if (!loading && movies.length > 0) {
      let result = [...movies];

      // Фильтрация по поисковому запросу
      if (options.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        result = result.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.description?.toLowerCase().includes(query) ||
            movie.genre?.toLowerCase().includes(query),
        );
      }

      // Фильтрация по жанру
      if (options.genre) {
        result = result.filter((movie) => movie.genre === options.genre);
      }

      setFilteredMovies(result);
    }
  }, [movies, loading, options.searchQuery, options.genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies: filteredMovies,
    allMovies: movies,
    loading,
    error,
    refetch: fetchMovies,
  };
};
