import apiClient from "../../../shared/api/apiClient";
import type { Cinema, MovieSession } from "../../../types";

const cinemaApi = {
  /**
   * Получить список всех кинотеатров
   */
  async getCinemas(): Promise<Cinema[]> {
    try {
      const response = await apiClient.get<Cinema[]>("/cinemas");
      return response.data;
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      throw error;
    }
  },

  /**
   * Получить кинотеатр по ID
   */
  async getCinemaById(cinemaId: string): Promise<Cinema> {
    try {
      const response = await apiClient.get<Cinema>(`/cinemas/${cinemaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cinema ${cinemaId}:`, error);
      throw error;
    }
  },

  /**
   * Получить список сеансов для кинотеатра
   */
  async getCinemaSessions(cinemaId: string): Promise<MovieSession[]> {
    try {
      const response = await apiClient.get<MovieSession[]>(
        `/cinemas/${cinemaId}/sessions`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching sessions for cinema ${cinemaId}:`, error);
      throw error;
    }
  },
};

export default cinemaApi;
