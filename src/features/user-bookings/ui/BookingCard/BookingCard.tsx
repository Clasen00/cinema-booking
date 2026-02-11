import type { Booking } from "@/entities/booking/model/types";
import { formatSeats } from "../../lib/utils/formatSeats";
import { Button } from "@/shared/ui";
import { PaymentTimer } from "../PaymentTimer/PaymentTimer";
import styles from "./BookingCard.module.scss";
import { formatSessionDate, formatBookingDate } from "@/shared/lib/utils/date";
import { API_BASE_URL } from "@/shared/api/apiClient";

interface BookingCardProps {
  booking: Booking;
  paymentTimeSeconds?: number;
  onPayment?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  processing?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  paymentTimeSeconds,
  onPayment,
  onCancel,
  processing = false,
}) => {
  const isUnpaid = !booking.isPaid;
  const isPast = booking.movieSession
    ? new Date(booking.movieSession.startTime) < new Date()
    : false;

  const handlePayment = () => {
    onPayment?.(booking.id);
  };

  const handleCancel = () => {
    if (window.confirm("Вы уверены, что хотите отменить бронирование?")) {
      onCancel?.(booking.id);
    }
  };

  return (
    <div className={`${styles.card} ${isPast ? styles.past : ""}`}>
      <div className={styles.header}>
        <div className={styles.movieInfo}>
          {booking.movie?.posterImage && (
            <img
              src={`${API_BASE_URL}${booking.movie.posterImage}`}
              alt={booking.movie.title}
              className={styles.poster}
            />
          )}
          <div>
            <h3 className={styles.movieTitle}>{booking.movie?.title}</h3>
            <div className={styles.movieDetails}>
              {booking.movie?.lengthMinutes && (
                <span>{booking.movie.lengthMinutes} мин</span>
              )}
              {booking.movie?.rating && <span>★ {booking.movie.rating}</span>}
            </div>
          </div>
        </div>

        <div className={styles.statusBadge}>
          {isUnpaid ? (
            <span className={styles.unpaid}>Неоплачен</span>
          ) : isPast ? (
            <span className={styles.past}>Прошедший</span>
          ) : (
            <span className={styles.upcoming}>Будущий</span>
          )}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.label}>Кинотеатр:</span>
          <span className={styles.value}>{booking.cinema?.name}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Зал:</span>
          <span className={styles.value}>{booking.movieSession?.hall}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Дата сеанса:</span>
          <span className={styles.value}>
            {booking.movieSession
              ? formatSessionDate(booking.movieSession.startTime)
              : "—"}
          </span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Места:</span>
          <span className={styles.value}>{formatSeats(booking.seats)}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Стоимость:</span>
          <span className={styles.price}>
            {booking.movieSession
              ? booking.movieSession.price * booking.seats.length
              : 0}{" "}
            ₽
          </span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.label}>Забронирован:</span>
          <span className={styles.value}>
            {formatBookingDate(booking.bookedAt)}
          </span>
        </div>
      </div>

      {isUnpaid && paymentTimeSeconds && (
        <div className={styles.paymentSection}>
          <PaymentTimer
            bookedAt={booking.bookedAt}
            paymentTimeSeconds={paymentTimeSeconds}
          />

          <div className={styles.actions}>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className={styles.payButton}
            >
              {processing ? "Обработка..." : "Оплатить"}
            </Button>

            <Button
              onClick={handleCancel}
              disabled={processing}
              className={styles.cancelButton}
            >
              Отменить
            </Button>
          </div>
        </div>
      )}

      {!isUnpaid && !isPast && (
        <div className={styles.actions}>
          <Button
            onClick={handleCancel}
            disabled={processing}
            className={styles.cancelButton}
          >
            Отменить бронирование
          </Button>
        </div>
      )}
    </div>
  );
};
