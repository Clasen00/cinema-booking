import React from "react";
import { MoviePoster } from "../MoviePoster/MoviePoster";
import styles from "./MovieInfo.module.scss";
import type { Movie } from "@/types";
import { API_BASE_URL } from "@/shared/api/apiClient";

interface MovieInfoProps {
  movie: Movie;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <div className={styles.movieInfo}>
      <div className={styles.posterColumn}>
        <MoviePoster
          posterUrl={`${API_BASE_URL}${movie.posterImage}`}
          title={movie.title}
        />
      </div>

      <div className={styles.detailsColumn}>
        <h1 className={styles.title}>{movie.title}</h1>

        <div className={styles.details}>
          {movie.lengthMinutes && (
            <div className={styles.detail}>
              <strong>Продолжительность:</strong> {movie.lengthMinutes} минут
            </div>
          )}
          {movie.year && (
            <div className={styles.detail}>
              <strong>Год выпуска:</strong> {movie.year}
            </div>
          )}
          {movie.rating && (
            <div className={styles.detail}>
              <strong>Рейтинг:</strong> {movie.rating}/10
            </div>
          )}
        </div>

        {movie.description && (
          <div className={styles.descriptionSection}>
            <h2 className={styles.descriptionTitle}>Описание</h2>
            <p className={styles.description}>{movie.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
