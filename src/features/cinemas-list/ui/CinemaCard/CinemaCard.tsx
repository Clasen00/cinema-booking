import React from "react";
import { Link } from "react-router-dom";
import styles from "./CinemaCard.module.scss";
import type { Cinema } from "@/types";

interface CinemaCardProps {
  cinema: Cinema;
}

export const CinemaCard: React.FC<CinemaCardProps> = ({ cinema }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.name}>{cinema.name}</h2>

        {cinema.address && (
          <div className={styles.field}>
            <span className={styles.label}>Адрес:</span>
            <p className={styles.value}>{cinema.address}</p>
          </div>
        )}

        <div className={styles.actions}>
          <Link to={`/cinemas/${cinema.id}`} className={styles.button}>
            Просмотреть сеансы
          </Link>
        </div>
      </div>
    </div>
  );
};
