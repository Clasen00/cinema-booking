import apiClient from "@/shared/api/apiClient";
import type { Booking } from "../model/types";

const bookingApi = {
  /**
   * Получить все бронирования текущего пользователя
   */
  async getUserBookings(): Promise<Booking[]> {
    try {
      const response = await apiClient.get<Booking[]>("/me/bookings");
      return response.data;
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  },

  /**
   * Создать платеж для бронирования
   */
  async createPayment(bookingId: string): Promise<{ paymentId: string }> {
    try {
      const response = await apiClient.post<{ paymentId: string }>(
        `/bookings/${bookingId}/payments`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Ошибка создания платежа для бронирования ${bookingId}:`,
        error,
      );
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
      console.error(`Ошибка отмены бронирования ${bookingId}:`, error);
      throw error;
    }
  },
};

export default bookingApi;
