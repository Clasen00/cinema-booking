import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { formatDateTime } from "@/shared/lib/utils/date";
import { groupSessionsByMovie } from "../../lib/utils";
import type { MovieSession } from "@/entities/session";
import styles from "./SessionsTable.module.scss";

interface SessionsTableProps {
  sessions: MovieSession[];
}

export const SessionsTable: React.FC<SessionsTableProps> = ({ sessions }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const groupedSessions = useMemo(() => {
    const grouped = groupSessionsByMovie(sessions);

    // Фильтрация по дате если выбрана
    if (selectedDate) {
      Object.keys(grouped).forEach((movieId) => {
        grouped[movieId] = grouped[movieId].filter((session) => {
          const { date } = formatDateTime(session.startTime);
          return date === selectedDate;
        });
      });
    }

    return grouped;
  }, [sessions, selectedDate]);

  // Получаем уникальные даты для фильтра
  const uniqueDates = useMemo(() => {
    const dates = sessions.map((session) => {
      const { date } = formatDateTime(session.startTime);
      return date;
    });
    return Array.from(new Set(dates)).sort();
  }, [sessions]);

  if (sessions.length === 0) {
    return (
      <div className={styles.noSessions}>
        <p>Нет доступных сеансов для этого кинотеатра</p>
        <p>Попробуйте выбрать другую дату или посмотреть другие фильмы</p>
      </div>
    );
  }

  return (
    <div className={styles.sessionsSection}>
      <h2 className={styles.sectionTitle}>Ближайшие сеансы</h2>

      <div className={styles.filterBar}>
        <div className={styles.dateFilter}>
          <Button
            className={`${styles.dateButton} ${!selectedDate ? styles.active : ""}`}
            onClick={() => setSelectedDate(null)}
          >
            Все дни
          </Button>

          {uniqueDates.map((date) => (
            <Button
              key={date}
              className={`${styles.dateButton} ${selectedDate === date ? styles.active : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.sessionsList}>
        {Object.entries(groupedSessions).map(([movieId, movieSessions]) => {
          if (movieSessions.length === 0) return null;

          return (
            <div key={movieId} className={styles.movieGroup}>
              <div className={styles.movieHeader}>
                <div className={styles.movieTitle}>Фильм ID: {movieId}</div>
                <div className={styles.movieInfo}>
                  <span className={styles.movieInfoItem}>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {movieSessions.length} сеансов
                  </span>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Дата и время</th>
                      <th>Зал</th>
                      <th>Цена</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieSessions.map((session) => {
                      const { date, time } = formatDateTime(session.startTime);
                      return (
                        <tr key={session.id}>
                          <td data-label="Дата и время">
                            <div className={styles.sessionTime}>
                              <span className={styles.sessionDate}>{date}</span>
                              <span className={styles.sessionTimeValue}>
                                {time}
                              </span>
                            </div>
                          </td>
                          <td
                            data-label="Действие"
                            className={styles.actionCell}
                          >
                            <Link
                              to={`/sessions/${session.id}`}
                              className={styles.bookButton}
                            >
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                              </svg>
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
          );
        })}
      </div>
    </div>
  );
};
