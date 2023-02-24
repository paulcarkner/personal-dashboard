import React from "react";
import styles from "./DateCountDown.module.css";

type Props = { dueDate: Date };

export const DateCountDown = ({ dueDate }: Props) => {
  return (
    <div className={styles.CountContainer}>
      <div className={styles.Count}>
        {(
          (dueDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000) +
          1
        )
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, `$1,`)}
      </div>
      <div className={styles.Unit}>Days</div>
    </div>
  );
};
