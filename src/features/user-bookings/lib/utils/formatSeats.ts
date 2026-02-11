import type { Seat } from "@/types";

export const formatSeats = (seats: Seat[]): string => {
  return seats
    .map((s) => `Ряд ${s.rowNumber}, Место ${s.seatNumber}`)
    .join(", ");
};
