import React from "react";
import { Button, Input } from "@/shared/ui";
import styles from "./MovieFilters.module.scss";

interface MovieFiltersProps {
  onSearch: (query: string) => void;
  onGenreChange: (genre: string) => void;
  searchQuery: string;
  selectedGenre: string;
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  onSearch,
  onGenreChange,
  searchQuery,
  selectedGenre,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleClearFilters = () => {
    onSearch("");
    onGenreChange("");
  };

  return (
    <div className={styles.filters}>
      <Input
        type="text"
        placeholder="Поиск фильмов по названию или описанию..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />

      {(searchQuery || selectedGenre) && (
        <Button
          onClick={handleClearFilters}
          className={styles.filterButton}
          type="button"
        >
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
};
