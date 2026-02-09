export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  duration: number;
  genre: string;
  rating?: number;
  releaseYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovieSession {
  id: string;
  movieId: string;
  cinemaId: string;
  startTime: string;
  endTime: string;
  price: number;
  hall: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: Array<{
    row: number;
    seat: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  movieSessionId: string;
  bookedSeats: Array<{
    row: number;
    seat: number;
  }>;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "expired";
  bookedAt: string;
  paidAt?: string;
  expiresAt: string;
  movieSession?: MovieSession;
  movie?: Movie;
  cinema?: Cinema;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  paymentTimeoutSeconds: number;
  maxSeatsPerBooking: number;
  bookingExpirationMinutes: number;
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

export interface SeatSelection {
  row: number;
  seat: number;
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
