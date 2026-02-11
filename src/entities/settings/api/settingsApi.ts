import apiClient from "../../../shared/api/apiClient";
import type { Settings } from "../../../types";

export const settingsApi = {
  /**
   * Получить настройки приложения
   */
  async getSettings(): Promise<Settings> {
    try {
      const response = await apiClient.get<Settings>("/settings");
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении настроек:", error);
      throw error;
    }
  },
};

export default settingsApi;
