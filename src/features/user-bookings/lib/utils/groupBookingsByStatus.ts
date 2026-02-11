import type { Booking, BookingGroup } from "@/entities/booking/model/types";
import { calculateRemainingTime } from "./calculateRemainingTime";

export const groupBookingsByStatus = (
  bookings: Booking[],
  paymentTimeSeconds?: number,
): BookingGroup => {
  const now = new Date();

  return bookings.reduce(
    (groups, booking) => {
      // Неоплаченные бронирования
      if (!booking.isPaid && paymentTimeSeconds) {
        const remainingTime = calculateRemainingTime(
          booking.bookedAt,
          paymentTimeSeconds,
        );

        // Если время еще не истекло
        if (remainingTime !== null && remainingTime > 0) {
          groups.unpaid.push(booking);
          return groups;
        }
        // Если время истекло, пропускаем (будет удалено в хуке)
        return groups;
      }

      // Оплаченные бронирования
      if (booking.isPaid && booking.movieSession) {
        const sessionTime = new Date(booking.movieSession.startTime);

        if (sessionTime > now) {
          groups.upcoming.push(booking);
        } else {
          groups.past.push(booking);
        }
      }

      return groups;
    },
    { unpaid: [], upcoming: [], past: [] } as BookingGroup,
  );
};
