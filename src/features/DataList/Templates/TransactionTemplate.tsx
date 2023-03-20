/******************************************************************

           Name: TransactionTemplate
    Description: List item for financial transactions
    Return Type: JSX.Element
          Props: name: string,
                 date: date,
                 amount: number
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./TransactionTemplate.module.css";

//Types
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
          styles[amount < 0 ? "negative" : "positive"]
        }`}
      >
        {amount < 0 ? "-" : ""}$
        {Math.abs(amount)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`)}
        {/* currency with commas, two digits */}
      </div>
      <div className={styles.date}>{date.toString().substring(0, 10)}</div>
      {/* get date component of date */}
    </div>
  );
};
