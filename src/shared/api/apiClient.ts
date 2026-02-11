import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3022";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError,
    );

    this.client.interceptors.response.use(
      (response) => response,
      this.handleResponseError,
    );
  }

  private handleRequest = (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  private handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  private handleResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      const currentPath = window.location.pathname;
      const publicPaths = ["/login", "/register", "/movies", "/cinemas"];

      if (!publicPaths.some((path) => currentPath.startsWith(path))) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  };

  public getInstance(): AxiosInstance {
    return this.client;
  }
}

const apiClient = new ApiClient(API_BASE_URL);

const axiosInstance = apiClient.getInstance();
export default axiosInstance;
