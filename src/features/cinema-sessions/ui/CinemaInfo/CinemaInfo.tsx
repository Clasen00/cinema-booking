import React from "react";
import styles from "./CinemaInfo.module.scss";
import type { Cinema } from "@/types";

interface CinemaInfoProps {
  cinema: Cinema;
}

export const CinemaInfo: React.FC<CinemaInfoProps> = ({ cinema }) => {
  if (!cinema.address) {
    return (
      <div className={styles.noDetails}>
        <p>Информация о кинотеатре отсутствует</p>
        <p>Попробуйте вернуться позже</p>
      </div>
    );
  }

  return (
    <div className={styles.cinemaInfo}>
      <h1 className={styles.title}>{cinema.name}</h1>

      <div className={styles.details}>
        {cinema.address && (
          <div className={styles.detail}>
            <strong>Адрес</strong>
            <p>{cinema.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};
