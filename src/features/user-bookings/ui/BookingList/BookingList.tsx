import React from "react";
import { BookingCard } from "../BookingCard/BookingCard";
import { EmptyState } from "../EmptyState/EmptyState";
import styles from "./BookingList.module.scss";
import type { Booking } from "@/entities/booking";

interface BookingListProps {
  bookings: Booking[];
  title: string;
  paymentTimeSeconds?: number;
  onPayment?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  processing?: string | null;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  title,
  paymentTimeSeconds,
  onPayment,
  onCancel,
  processing,
}) => {
  if (bookings.length === 0) {
    return <EmptyState title={title} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {title} <span className={styles.count}>({bookings.length})</span>
      </h2>

      <div className={styles.list}>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            paymentTimeSeconds={paymentTimeSeconds}
            onPayment={onPayment}
            onCancel={onCancel}
            processing={processing === booking.id}
          />
        ))}
      </div>
    </div>
  );
};
