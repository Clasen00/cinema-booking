import apiClient from "@/shared/api/apiClient";
import type { RegisterData, AuthResponse, ApiError, LoginData } from "@/types";
import axios from "axios";

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/register", data);

      // Проверяем корректность ответа сервера
      if (!response.data) {
        console.error("Register API: ответ сервера пуст");
        throw { message: "Сервер вернул пустой ответ" } as ApiError;
      }

      return response.data;
    } catch (error: any) {
      console.error("Register API error:", error);

      if (axios.isAxiosError(error) && error.response) {
        // Логируем детали ошибки от сервера
        console.error("Server response:", error.response.data);
        throw error.response.data as ApiError;
      }

      // Если это наша кастомная ошибка, пробрасываем её
      if (error.message) {
        throw error;
      }

      throw { message: "Ошибка регистрации" } as ApiError;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/login", data);

      // Проверяем корректность ответа сервера
      if (!response.data) {
        console.error("Login API: ответ сервера пуст");
        throw { message: "Сервер вернул пустой ответ" } as ApiError;
      }

      return response.data;
    } catch (error: any) {
      console.error("Login API error:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
        if (error.response.status === 401) {
          throw {
            message:
              "Неверный логин или пароль. Проверьте введенные данные и попробуйте снова",
          } as ApiError;
        }
        throw error.response.data as ApiError;
      }

      // Если это наша кастомная ошибка, пробрасываем её
      if (error.message) {
        throw error;
      }

      throw { message: "Ошибка авторизации" } as ApiError;
    }
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    // Удаляем заголовок авторизации из axios
    delete apiClient.defaults.headers.common["Authorization"];
  },

  getCurrentUser(): { id: string; username: string } | null {
    const userStr = localStorage.getItem("authUser");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  // Установить токен авторизации (после регистрации/авторизации)
  setToken(token: string): void {
    localStorage.setItem("authToken", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
};

export default authApi;
