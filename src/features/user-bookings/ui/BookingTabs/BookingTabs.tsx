import React, { useState } from "react";
import { BookingList } from "../BookingList/BookingList";
import { useBookingPayment } from "../../lib/hooks/useBookingPayment";
import { useSettings } from "../../lib/hooks/useSettings";
import styles from "./BookingTabs.module.scss";
import { Button } from "@/shared/ui";
import type { Booking } from "@/entities/booking/model/types";

interface BookingTabsProps {
  unpaidBookings: Booking[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  onRefresh?: () => void;
}

export const BookingTabs: React.FC<BookingTabsProps> = ({
  unpaidBookings,
  upcomingBookings,
  pastBookings,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState<"unpaid" | "upcoming" | "past">(
    "unpaid",
  );
  const { settings } = useSettings();

  const { processing, processPayment, cancelBooking } = useBookingPayment({
    onSuccess: () => {
      onRefresh?.();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handlePayment = (bookingId: string) => {
    processPayment(bookingId);
  };

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const tabs = [
    { id: "unpaid", label: "Неоплаченные", count: unpaidBookings.length },
    { id: "upcoming", label: "Будущие", count: upcomingBookings.length },
    { id: "past", label: "Прошедшие", count: pastBookings.length },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={styles.tabCount}>{tab.count}</span>
            )}
          </Button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === "unpaid" && (
          <BookingList
            bookings={unpaidBookings}
            title="Неоплаченные билеты"
            paymentTimeSeconds={settings?.bookingPaymentTimeSeconds}
            onPayment={handlePayment}
            onCancel={handleCancel}
            processing={processing}
          />
        )}

        {activeTab === "upcoming" && (
          <BookingList
            bookings={upcomingBookings}
            title="Будущие сеансы"
            onCancel={handleCancel}
            processing={processing}
          />
        )}

        {activeTab === "past" && (
          <BookingList bookings={pastBookings} title="Прошедшие сеансы" />
        )}
      </div>
    </div>
  );
};
