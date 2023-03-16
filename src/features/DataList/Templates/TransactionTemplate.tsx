import React from "react";
import styles from "./TransactionTemplate.module.css";

export type props = {
  name: string;
  date: Date;
  amount: number;
};

export const TransactionTemplate: React.FC<props> = ({
  name,
  date,
  amount,
}: props) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div
        className={`${styles.amount} ${
          styles[amount < 0 ? "Negative" : "Positive"]
        }`}
      >
        {amount < 0 ? "-" : ""}$
        {Math.abs(amount)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`)}
      </div>
      <div className={styles.date}>{date.toString().substring(0, 10)}</div>
    </div>
  );
};
