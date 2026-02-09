import apiClient from "../../../shared/api/apiClient";
import type { Booking } from "../../../types";

const bookingsApi = {
  /**
   * Получить все бронирования текущего пользователя
   */
  async getMyBookings(): Promise<Booking[]> {
    try {
      const response = await apiClient.get<Booking[]>("/me/bookings");
      return response.data;
    } catch (error) {
      console.error("Ошибка в получении бронирований:", error);
      throw error;
    }
  },

  /**
   * Получить бронирование по ID
   */
  async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const response = await apiClient.get<Booking>(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка в получении бронирований ${bookingId}:`, error);
      throw error;
    }
  },

  /**
   * Оплатить бронирование
   */
  async payBooking(bookingId: string): Promise<Booking> {
    try {
      const response = await apiClient.post<Booking>(
        `/bookings/${bookingId}/payments`,
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при оплате бронирований ${bookingId}:`, error);
      throw error;
    }
  },

  /**
   * Отменить бронирование
   */
  async cancelBooking(bookingId: string): Promise<void> {
    try {
      await apiClient.delete(`/bookings/${bookingId}`);
    } catch (error) {
      console.error(`Ошибка при отмене бронирования ${bookingId}:`, error);
      throw error;
    }
  },
};

export default bookingsApi;
