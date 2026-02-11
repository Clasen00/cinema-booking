import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "@/shared/lib/utils/date";
import { groupSessionsByCinema } from "../../lib/utils/groupSessionsByCinema";
import styles from "./SessionsByCinemaTable.module.scss";
import type { MovieSession } from "@/entities/cinema";

interface SessionsByCinemaTableProps {
  sessions: MovieSession[];
}

export const SessionsByCinemaTable: React.FC<SessionsByCinemaTableProps> = ({
  sessions,
}) => {
  const groupedSessions = groupSessionsByCinema(sessions);

  if (sessions.length === 0) {
    return (
      <div className={styles.noSessions}>
        Нет доступных сеансов для этого фильма
      </div>
    );
  }

  return (
    <div className={styles.sessionsSection}>
      <h2 className={styles.sectionTitle}>Сеансы</h2>

      <div className={styles.sessionsList}>
        {Object.entries(groupedSessions).map(([cinemaId, cinemaSessions]) => (
          <div key={cinemaId} className={styles.cinemaGroup}>
            <h3 className={styles.cinemaTitle}>Кинотеатр ID: {cinemaId}</h3>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Зал</th>
                    <th>Цена</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {cinemaSessions.map((session) => {
                    const { date, time } = formatDateTime(session.startTime);
                    return (
                      <tr key={session.id}>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>
                          <Link
                            to={`/sessions/${session.id}`}
                            className={styles.bookButton}
                          >
                            Забронировать
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
