import apiClient from "../../../shared/api/apiClient";
import type { MovieSession, Booking, SeatSelection } from "../../../types";

export interface BookingRequest {
  seats: SeatSelection[];
}

const sessionsApi = {
  /**
   * Получить информацию о сеансе по ID
   */
  async getSessionById(sessionId: string): Promise<MovieSession> {
    try {
      const response = await apiClient.get<MovieSession>(
        `/movieSessions/${sessionId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Забронировать места на сеанс
   */
  async bookSeats(sessionId: string, seats: SeatSelection[]): Promise<Booking> {
    try {
      const response = await apiClient.post<Booking>(
        `/movieSessions/${sessionId}/bookings`,
        { seats },
      );
      return response.data;
    } catch (error) {
      console.error(`Error booking seats for session ${sessionId}:`, error);
      throw error;
    }
  },
};

export default sessionsApi;
