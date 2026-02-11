import type { MovieSession } from "@/entities/session/model/types";
import apiClient from "../../../shared/api/apiClient";
import type { Movie } from "../../../types";

const movieApi = {
  /**
   * Получить список всех фильмов
   */
  async getMovies(): Promise<Movie[]> {
    try {
      const response = await apiClient.get<Movie[]>("/movies");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении фильмов:", error);
      throw error;
    }
  },

  /**
   * Получить фильм по ID
   */
  async getMovieById(movieId: string): Promise<Movie> {
    try {
      const response = await apiClient.get<Movie[]>("/movies");

      const movie = response.data.find((movie) => movie.id === Number(movieId));
      if (!movie) {
        throw new Error(`Фильм с ID ${movieId} не найден`);
      }
      return movie;
    } catch (error) {
      console.error(`Ошибка при получении фильма ${movieId}:`, error);
      throw error;
    }
  },

  /**
   * Получить список сеансов для фильма
   */
  async getMovieSessions(movieId: string): Promise<MovieSession[]> {
    try {
      const response = await apiClient.get<MovieSession[]>(
        `/movies/${movieId}/sessions`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Ошибка при получении сеансов для фильма ${movieId}:`,
        error,
      );
      throw error;
    }
  },
};

export default movieApi;
