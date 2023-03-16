import React from "react";
import styles from "./DateCountDown.module.css";

type props = { dueDate: Date };

export const DateCountDown = ({ dueDate }: props) => {
  return (
    <div className={styles.countContainer}>
      <div className={styles.count}>
        {(
          (dueDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000) +
          1
        )
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, `$1,`)}
      </div>
      <div className={styles.unit}>Days</div>
    </div>
  );
};
