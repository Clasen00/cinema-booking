import React from "react";
import styles from "./EmptyState.module.scss";

export const EmptyState: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>Нет доступных кинотеатров</p>
    </div>
  );
};
