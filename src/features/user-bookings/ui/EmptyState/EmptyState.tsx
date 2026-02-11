import React from "react";
import styles from "./EmptyState.module.scss";

interface EmptyStateProps {
  title?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title }) => {
  const getMessage = () => {
    switch (title) {
      case "Неоплаченные билеты":
        return "У вас нет неоплаченных билетов";
      case "Будущие сеансы":
        return "У вас нет предстоящих сеансов";
      case "Прошедшие сеансы":
        return "У вас нет прошедших сеансов";
      default:
        return "Здесь пока ничего нет";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      </div>
      <h3 className={styles.title}>{getMessage()}</h3>
      <p className={styles.message}>
        {title === "Неоплаченные билеты"
          ? "Здесь будут отображаться билеты, ожидающие оплаты"
          : title === "Будущие сеансы"
            ? "Забронируйте билеты, чтобы они появились здесь"
            : "Посещенные вами сеансы появятся здесь"}
      </p>
    </div>
  );
};
