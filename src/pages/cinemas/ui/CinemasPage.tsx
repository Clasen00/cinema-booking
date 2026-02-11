import React from "react";
import { CinemasList } from "@/features/cinemas-list";
import { LoadingErrorState } from "@/shared/ui";
import { useCinemas } from "@/features/cinemas-list/lib/hooks/useCinemas";
import styles from "./CinemasPage.module.scss";

const CinemasPage: React.FC = () => {
  const { cinemas, loading, error, refetch } = useCinemas();

  if (loading || error) {
    return (
      <LoadingErrorState loading={loading} error={error} onRetry={refetch} />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Кинотеатры</h1>

      <CinemasList cinemas={cinemas} />
    </div>
  );
};

export default CinemasPage;
