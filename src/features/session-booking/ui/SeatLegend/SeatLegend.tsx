import React from "react";
import styles from "./SeatLegend.module.scss";

export const SeatLegend: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.available}`} />

          <span>Свободно</span>
        </div>

        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.selected}`} />
          <span>Выбрано</span>
        </div>

        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.booked}`} />

          <span>Занято</span>
        </div>

        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.disabled}`} />

          <span>Недоступно</span>
        </div>
      </div>
    </div>
  );
};
