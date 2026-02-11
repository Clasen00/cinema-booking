import apiClient from "@/shared/api/apiClient";
import type { RegisterData, AuthResponse, ApiError, LoginData } from "@/types";
import axios from "axios";

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/register", data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: "Ошибка регистрации" } as ApiError;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/login", data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw {
            message:
              "Неверный логин или пароль. Проверьте введенные данные и попробуйте снова",
          } as ApiError;
        }
        throw error.response.data as ApiError;
      }
      throw { message: "Ошибка авторизации" } as ApiError;
    }
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Удаляем заголовок авторизации из axios
    delete apiClient.defaults.headers.common["Authorization"];
  },

  getCurrentUser(): { id: string; username: string } | null {
    const userStr = localStorage.getItem("user");
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
