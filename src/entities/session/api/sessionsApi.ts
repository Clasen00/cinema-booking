import apiClient from "@/shared/api/apiClient";
import type { MovieSessionDetails, BookingResponse } from "../model/types";
import type { Seat } from "@/types";

const sessionApi = {
  /**
   * Получить информацию о сеансе по ID
   */
  async getSessionById(id: string): Promise<MovieSessionDetails> {
    try {
      const response = await apiClient.get<MovieSessionDetails>(
        `/movieSessions/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка получения информации о сеансе ${id}:`, error);
      throw error;
    }
  },

  /**
   * Забронировать места на сеансе
   */
  async bookSeats(sessionId: string, seats: Seat[]): Promise<BookingResponse> {
    try {
      const response = await apiClient.post<BookingResponse>(
        `/movieSessions/${sessionId}/bookings`,
        { seats },
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка бронирования мест на сеанс ${sessionId}:`, error);
      throw error;
    }
  },
};

export default sessionApi;
