import apiClient from "../../../shared/api/apiClient";
import type { Movie, MovieSession } from "../../../types";

const movieApi = {
  /**
   * Получить список всех фильмов
   */
  async getMovies(): Promise<Movie[]> {
    try {
      const response = await apiClient.get<Movie[]>("/movies");
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  /**
   * Получить фильм по ID
   */
  async getMovieById(movieId: string): Promise<Movie> {
    try {
      const response = await apiClient.get<Movie>(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie ${movieId}:`, error);
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
      console.error(`Error fetching sessions for movie ${movieId}:`, error);
      throw error;
    }
  },
};

export default movieApi;
