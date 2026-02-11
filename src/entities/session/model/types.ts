import type { Seat } from "@/types";

export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}

export interface MovieSessionSeats {
  seats: {
    rows: number;
    seatsPerRow: number;
  };
}

export interface MovieSessionDetails extends MovieSession, MovieSessionSeats {
  bookedSeats: Seat[];
}

export interface BookingRequest {
  sessionId: string;
  seats: Seat[];
}

export interface BookingResponse {
  bookingId: string;
  sessionId: string;
  seats: Seat[];
  totalPrice: number;
  bookedAt: string;
}
