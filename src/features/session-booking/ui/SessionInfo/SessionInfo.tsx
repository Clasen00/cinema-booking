import React from "react";
import type { MovieSessionDetails } from "@/entities/session/model/types";
import styles from "./SessionInfo.module.scss";
import { formatDate, formatTime } from "@/shared/lib/utils/date";

interface SessionInfoProps {
  session: MovieSessionDetails;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ session }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Дата и время:</span>

          <span className={styles.value}>
            {formatDate(session.startTime)} {formatTime(session.startTime)}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Цена за место:</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Свободных мест:</span>

          <span className={styles.value}>
            {session.seats.rows * session.seats.seatsPerRow -
              session.bookedSeats.length}
          </span>
        </div>
      </div>
    </div>
  );
};
