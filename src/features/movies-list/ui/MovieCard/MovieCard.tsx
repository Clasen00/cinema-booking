import React from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import { API_BASE_URL } from "@/shared/api/apiClient";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      {movie.posterImage && (
        <div className={styles.posterContainer}>
          <img
            src={`${API_BASE_URL}${movie.posterImage}`}
            alt={movie.title}
            className={styles.poster}
          />
        </div>
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>

        {movie.lengthMinutes && (
          <p className={styles.duration}>
            Продолжительность: {movie.lengthMinutes} мин
          </p>
        )}

        {movie.description && (
          <p className={styles.description}>{movie.description}</p>
        )}

        {movie.year && <p className={styles.year}>{movie.year}</p>}

        {movie.rating && <p className={styles.rating}>{movie.rating}</p>}

        <div className={styles.actions}>
          <Link to={`/movies/${movie.id}`} className={styles.button}>
            Просмотреть сеансы
          </Link>
        </div>
      </div>
    </div>
  );
};
