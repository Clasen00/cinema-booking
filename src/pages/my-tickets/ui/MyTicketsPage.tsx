import React from "react";
import { BookingTabs } from "@/features/user-bookings";
import { LoadingErrorState, ProtectedRoute } from "@/shared/ui";
import { useUserBookings } from "@/features/user-bookings/lib/hooks/useUserBookings";
import styles from "./MyTicketsPage.module.scss";

const MyTicketsPage: React.FC = () => {
  const {
    loading,
    error,
    refetch,
    unpaid: unpaidBookings,
    upcoming: upcomingBookings,
    past: pastBookings,
  } = useUserBookings();

  if (loading || error) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error}
        onRetry={refetch}
        loadingText="Загрузка ваших билетов..."
      />
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1 className={styles.title}>Мои билеты</h1>
        <p className={styles.subtitle}>Управление бронированиями и билетами</p>

        <BookingTabs
          unpaidBookings={unpaidBookings}
          upcomingBookings={upcomingBookings}
          pastBookings={pastBookings}
          onRefresh={refetch}
        />
      </div>
    </ProtectedRoute>
  );
};

export default MyTicketsPage;
