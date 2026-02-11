import type { Seat } from "@/types";
import { useState, useCallback } from "react";

export const useSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const isSeatSelected = useCallback(
    (row: number, seat: number) => {
      return selectedSeats.some(
        (s) => s.rowNumber === row && s.seatNumber === seat,
      );
    },
    [selectedSeats],
  );

  const handleSeatClick = useCallback((row: number, seat: number) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some(
        (s) => s.rowNumber === row && s.seatNumber === seat,
      );
      if (isSelected) {
        return prev.filter(
          (s) => !(s.rowNumber === row && s.seatNumber === seat),
        );
      } else {
        return [...prev, { rowNumber: row, seatNumber: seat }];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  return {
    selectedSeats,
    isSeatSelected,
    handleSeatClick,
    clearSelection,
  };
};
