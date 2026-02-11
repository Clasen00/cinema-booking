import React from "react";
import styles from "./BookingSummary.module.scss";
import { Button } from "@/shared/ui";

interface BookingSummaryProps {
  selectedSeatsCount: number;
  isAuthenticated: boolean;
  onBooking: () => void;
  loading: boolean;
  disabled: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSeatsCount,
  isAuthenticated,
  onBooking,
  loading,
  disabled,
}) => {
  if (!isAuthenticated) {
    return (
      <div className={styles.authRequired}>
        <h3 className={styles.title}>Для бронирования необходимо войти</h3>
        <div className={styles.authButtons}>
          <a href="/login" className={styles.loginButton}>
            Войти
          </a>
          <a href="/register" className={styles.registerButton}>
            Зарегистрироваться
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Сводка бронирования</h3>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span>Выбрано мест:</span>
          <span className={styles.seatCount}>{selectedSeatsCount}</span>
        </div>
      </div>

      <Button
        className={styles.bookButton}
        onClick={onBooking}
        disabled={disabled}
      >
        {loading ? (
          <span className={styles.loading}>
            <span className={styles.spinner} />
            Бронирование...
          </span>
        ) : (
          `Забронировать ${selectedSeatsCount > 0 ? selectedSeatsCount : ""} мест${selectedSeatsCount > 1 ? "а" : "о"}`
        )}
      </Button>
    </div>
  );
};
