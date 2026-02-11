import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoadingErrorState.module.scss";

interface LoadingErrorStateProps {
  loading: boolean;
  error: string | null;
  backLink?: string;
  loadingText?: string;
  onRetry?: () => void;
}

export const LoadingErrorState: React.FC<LoadingErrorStateProps> = ({
  loading,
  error,
  onRetry,
  backLink,
  loadingText = "Загрузка...",
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{loadingText}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Попробовать снова
          </button>
        )}
        {backLink && (
          <Link to={backLink} className={styles.backButton}>
            Вернуться назад
          </Link>
        )}
      </div>
    );
  }

  return null;
};
