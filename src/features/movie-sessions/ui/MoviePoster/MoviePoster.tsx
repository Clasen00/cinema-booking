import React from "react";
import styles from "./MoviePoster.module.scss";

interface MoviePosterProps {
  posterUrl?: string;
  title: string;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({
  posterUrl,
  title,
}) => {
  if (!posterUrl) {
    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderText}>Нет постера</span>
      </div>
    );
  }

  return <img src={posterUrl} alt={title} className={styles.poster} />;
};
