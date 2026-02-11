import React from "react";
import { useParams } from "react-router-dom";
import { LoadingErrorState } from "@/shared/ui";
import { useSessionBooking } from "@/features/session-booking/lib/hooks/useSessionBooking";
import { SessionInfo } from "@/features/session-booking/ui/SessionInfo/SessionInfo";
import { SeatMap } from "@/features/session-booking/ui/SeatMap/SeatMap";
import { BookingSummary } from "@/features/session-booking/ui/BookingSummary/BookingSummary";
import { SeatLegend } from "@/features/session-booking/ui/SeatLegend/SeatLegend";
import { ScreenDisplay } from "@/features/session-booking/ui/ScreenDisplay/ScreenDisplay";
import styles from "./SessionBookingPage.module.scss";

const SessionBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    session,
    loading,
    error,
    selectedSeats,
    isAuthenticated,
    handleSeatClick,
    handleBooking,
    booking,
    refetch,
  } = useSessionBooking(id);

  if (loading) {
    return (
      <LoadingErrorState
        loading={loading}
        error={null}
        loadingText="Загрузка информации о сеансе..."
      />
    );
  }

  if (error || !session) {
    return (
      <LoadingErrorState
        loading={false}
        error={error || "Сеанс не найден"}
        onRetry={refetch}
        backLink="/movies"
      />
    );
  }

  return (
    <div className={styles.container}>
      <a href="/movies" className={styles.backLink}>
        ← Назад к фильмам
      </a>

      <div className={styles.content}>
        <h1 className={styles.title}>Бронирование мест</h1>

        <SessionInfo session={session} />

        {!isAuthenticated && (
          <div className={styles.authWarning}>
            <p>
              Вы не авторизованы. Вы можете просматривать занятые места, но для
              бронирования необходимо{" "}
              <a href="/login" className={styles.authLink}>
                войти
              </a>{" "}
              или{" "}
              <a href="/register" className={styles.authLink}>
                зарегистрироваться
              </a>
              .
            </p>
          </div>
        )}

        <div className={styles.seatSelection}>
          <div className={styles.screenSection}>
            <ScreenDisplay />
            <SeatLegend />
          </div>

          <SeatMap
            rows={session.seats.rows}
            seatsPerRow={session.seats.seatsPerRow}
            bookedSeats={session.bookedSeats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            disabled={!isAuthenticated || booking}
          />

          <BookingSummary
            selectedSeatsCount={selectedSeats.length}
            isAuthenticated={isAuthenticated}
            onBooking={handleBooking}
            loading={booking}
            disabled={selectedSeats.length === 0 || booking}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionBookingPage;
