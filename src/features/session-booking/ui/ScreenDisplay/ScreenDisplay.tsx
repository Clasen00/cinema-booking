import React from "react";
import styles from "./ScreenDisplay.module.scss";

export const ScreenDisplay: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <span className={styles.screenText}>ЭКРАН</span>
      </div>
    </div>
  );
};
