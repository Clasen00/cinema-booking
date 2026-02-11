import React from "react";
import { useParams } from "react-router-dom";
import { MovieInfo, SessionsByCinemaTable } from "@/features/movie-sessions";
import { LoadingErrorState } from "@/shared/ui";
import { useMovieDetails } from "@/features/movie-sessions/lib/hooks/useMovieDetails";
import styles from "./MovieDetailPage.module.scss";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, sessions, loading, error, refetch } = useMovieDetails(id);

  if (loading || error || !movie) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error || (!movie ? "Фильм не найден" : null)}
        onRetry={refetch}
        backLink="/movies"
        loadingText="Загрузка информации о фильме..."
      />
    );
  }

  return (
    <div className={styles.container}>
      <a href="/movies" className={styles.backLink}>
        ← Назад к фильмам
      </a>

      <div className={styles.content}>
        <MovieInfo movie={movie} />
        <SessionsByCinemaTable sessions={sessions} />
      </div>
    </div>
  );
};

export default MovieDetailPage;
