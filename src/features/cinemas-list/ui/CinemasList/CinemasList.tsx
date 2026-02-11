import React from "react";
import { CinemaCard } from "../CinemaCard/CinemaCard";
import { EmptyState } from "../EmptyState/EmptyState";
import type { Cinema } from "@/entities/cinema";
import styles from "./CinemasList.module.scss";

interface CinemasListProps {
  cinemas: Cinema[];
}

export const CinemasList: React.FC<CinemasListProps> = ({ cinemas }) => {
  if (cinemas.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.list}>
      {cinemas.map((cinema) => (
        <CinemaCard key={cinema.id} cinema={cinema} />
      ))}
    </div>
  );
};
