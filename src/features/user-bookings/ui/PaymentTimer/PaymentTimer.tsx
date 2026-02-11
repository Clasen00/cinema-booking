import React, { useState, useEffect } from "react";
import {
  calculateRemainingTime,
  formatRemainingTime,
} from "../../lib/utils/calculateRemainingTime";
import styles from "./PaymentTimer.module.scss";

interface PaymentTimerProps {
  bookedAt: string;
  paymentTimeSeconds: number;
  onExpire?: () => void;
}

export const PaymentTimer: React.FC<PaymentTimerProps> = ({
  bookedAt,
  paymentTimeSeconds,
  onExpire,
}) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const time = calculateRemainingTime(bookedAt, paymentTimeSeconds);
      setRemainingTime(time);

      if (time !== null && time <= 0) {
        onExpire?.();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [bookedAt, paymentTimeSeconds, onExpire]);

  if (remainingTime === null) return null;

  const isWarning = remainingTime < 60; // Меньше минуты
  const isCritical = remainingTime < 10; // Меньше 10 секунд

  return (
    <div className={styles.container}>
      <div className={styles.timerHeader}>
        <span className={styles.label}>Осталось времени на оплату:</span>
        <div
          className={`${styles.timer} ${
            isCritical ? styles.critical : isWarning ? styles.warning : ""
          }`}
        >
          {formatRemainingTime(remainingTime)}
        </div>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${Math.max(0, (remainingTime / paymentTimeSeconds) * 100)}%`,
            backgroundColor: isCritical
              ? "#ef4444"
              : isWarning
                ? "#f59e0b"
                : "#10b981",
          }}
        />
      </div>

      {remainingTime < 60 && (
        <p className={styles.warningMessage}>
          Время на оплату заканчивается! Пожалуйста, завершите оплату.
        </p>
      )}
    </div>
  );
};
