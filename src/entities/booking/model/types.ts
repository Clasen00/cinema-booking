import type { Cinema, Movie, Seat } from "@/types";

export interface Booking {
  id: string;
  userId: string;
  movieSessionId: string;
  sessionId: string;
  bookedAt: string;
  seats: Seat[];
  isPaid: boolean;
  movieSession?: MovieSessionDetails;
  movie?: Movie;
  cinema?: Cinema;
}

export interface MovieSessionDetails {
  id: number;
  startTime: string;
  hall: string;
  price: number;
  movieId: number;
  cinemaId: number;
}

export interface BookingGroup {
  unpaid: Booking[];
  upcoming: Booking[];
  past: Booking[];
}

export interface BookingStatus {
  isExpired: boolean;
  remainingTime: number | null;
}
