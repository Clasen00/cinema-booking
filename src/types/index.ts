export interface User {
  id: number;
  name: string;
  password_hash: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
}

export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface ErrorResponse {
  message: string;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
