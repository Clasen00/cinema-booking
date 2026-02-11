import React, { useState } from "react";
import { MovieFilters, MoviesList } from "@/features/movies-list";
import { LoadingErrorState } from "@/shared/ui";
import { useMovies } from "@/features/movies-list/lib/hooks/useMovies";
import styles from "./MoviesPage.module.scss";

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { movies, loading, error, refetch } = useMovies({
    searchQuery,
    genre: selectedGenre,
  });

  if (loading || error) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error}
        onRetry={refetch}
        loadingText="Загрузка фильмов..."
      />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Фильмы</h1>

      <MovieFilters
        onSearch={setSearchQuery}
        onGenreChange={setSelectedGenre}
        searchQuery={searchQuery}
        selectedGenre={selectedGenre}
      />

      {searchQuery && (
        <div className={styles.searchInfo}>
          Найдено {movies.length} фильмов по запросу "{searchQuery}"
        </div>
      )}

      <MoviesList movies={movies} />
    </div>
  );
};

export default MoviesPage;
