import React from "react";
import styles from "./MoviesList.module.scss";
import { EmptyState } from "@/features/cinemas-list";
import type { Movie } from "@/types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
