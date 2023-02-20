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
      <div className={styles.Amount}>${amount.toFixed(2)}</div>
      <div className={styles.Date}>{date.toString().substring(0, 10)}</div>
    </div>
  );
};
