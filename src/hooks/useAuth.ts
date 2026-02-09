import { useState, useEffect, useCallback } from "react";
import authApi from "../features/auth/api/authApi";

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Инициализация авторизации из localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true);

      const data = await authApi.login({
        username,
        password,
      });

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      username: string,
      password: string,
      passwordConfirmation: string,
    ) => {
      try {
        setIsLoading(true);
        // Валидация подтверждения пароля
        if (password !== passwordConfirmation) {
          throw new Error("Пароли не совпадают");
        }

        const data = await authApi.register({
          username,
          password,
          passwordConfirmation,
        });

        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }, []);

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isLoading,
  };
};
