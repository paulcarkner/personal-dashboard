import React from "react";
import styles from "./TransactionTemplate.module.css";

export type Props = {
  name: string;
  date: Date;
  amount: number;
};

export const TransactionTemplate: React.FC<Props> = ({
  name,
  date,
  amount,
}: Props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Name}>{name}</div>
      <div
        className={`${styles.Amount} ${
          styles[amount < 0 ? "Negative" : "Positive"]
        }`}
      >
        {amount < 0 ? "-" : ""}$
        {Math.abs(amount)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`)}
      </div>
      <div className={styles.Date}>{date.toString().substring(0, 10)}</div>
    </div>
  );
};
