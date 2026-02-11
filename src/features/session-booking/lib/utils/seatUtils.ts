import type { Seat } from "@/types";

export const isSeatBooked = (
  row: number,
  seat: number,
  bookedSeats: Seat[] = [],
): boolean => {
  return bookedSeats.some(
    (bookedSeat) =>
      bookedSeat.rowNumber === row && bookedSeat.seatNumber === seat,
  );
};

export const getSeatStatus = (
  row: number,
  seat: number,
  bookedSeats: Seat[] = [],
  selectedSeats: Seat[] = [],
  isAuthenticated: boolean = false,
): "available" | "booked" | "selected" | "disabled" => {
  if (isSeatBooked(row, seat, bookedSeats)) {
    return "booked";
  }

  if (selectedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat)) {
    return "selected";
  }

  if (!isAuthenticated) {
    return "disabled";
  }

  return "available";
};

export const generateSeatMap = (
  rows: number,
  seatsPerRow: number,
  bookedSeats: Seat[] = [],
  selectedSeats: Seat[] = [],
) => {
  const seats = [];

  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];

    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const isBooked = isSeatBooked(row, seat, bookedSeats);
      const isSelected = selectedSeats.some(
        (s) => s.rowNumber === row && s.seatNumber === seat,
      );

      rowSeats.push({
        row,
        seat,
        isBooked,
        isSelected,
        id: `${row}-${seat}`,
      });
    }

    seats.push({
      rowNumber: row,
      seats: rowSeats,
    });
  }

  return seats;
};
