import React from "react";
import { getSeatStatus } from "../../lib/utils/seatUtils";
import styles from "./SeatMap.module.scss";
import type { Seat } from "@/types";

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  selectedSeats: Seat[];
  onSeatClick: (row: number, seat: number) => void;
  disabled?: boolean;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  rows,
  seatsPerRow,
  bookedSeats,
  selectedSeats,
  onSeatClick,
  disabled = false,
}) => {
  const handleSeatClick = (row: number, seat: number) => {
    if (disabled) return;
    onSeatClick(row, seat);
  };

  const getSeatClass = (row: number, seat: number): string => {
    const status = getSeatStatus(
      row,
      seat,
      bookedSeats,
      selectedSeats,
      !disabled,
    );

    return `${styles.seat} ${styles[`seat${status.charAt(0).toUpperCase() + status.slice(1)}`]}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.rowLabels}>
        {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
          <div key={row} className={styles.rowLabel}>
            {row}
          </div>
        ))}
      </div>

      <div className={styles.seatGrid}>
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className={styles.row}>
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const seatStatus = getSeatStatus(
                  rowNumber,
                  seatNumber,
                  bookedSeats,
                  selectedSeats,
                  !disabled,
                );

                return (
                  <button
                    key={`${rowNumber}-${seatNumber}`}
                    className={getSeatClass(rowNumber, seatNumber)}
                    onClick={() => handleSeatClick(rowNumber, seatNumber)}
                    disabled={seatStatus === "booked" || disabled}
                    title={`Ряд ${rowNumber}, Место ${seatNumber}`}
                    type="button"
                  >
                    <span className={styles.seatNumber}>{seatNumber}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
