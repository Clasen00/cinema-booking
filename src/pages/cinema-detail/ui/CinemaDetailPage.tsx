import React from "react";
import { useParams } from "react-router-dom";
import { CinemaInfo, SessionsTable } from "@/features/cinema-sessions";
import { LoadingErrorState } from "@/shared/ui";
import { useCinemaDetails } from "@/features/cinema-sessions/lib/hooks/useCinemaDetails";
import styles from "./CinemaDetailPage.module.scss";

const CinemaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cinema, sessions, loading, error, refetch } = useCinemaDetails(id);

  if (loading || error || !cinema) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error || (!cinema ? "Кинотеатр не найден" : null)}
        onRetry={refetch}
        backLink="/cinemas"
      />
    );
  }

  return (
    <div className={styles.container}>
      <a href="/cinemas" className={styles.backLink}>
        ← Назад к кинотеатрам
      </a>

      <div className={styles.content}>
        <CinemaInfo cinema={cinema} />
        <SessionsTable sessions={sessions} />
      </div>
    </div>
  );
};

export default CinemaDetailPage;
