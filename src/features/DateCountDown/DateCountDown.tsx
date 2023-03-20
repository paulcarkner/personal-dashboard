/******************************************************************

           Name: DateCountDown
    Description: Numeric count down until a given date
    Return Type: JSX.Element
          Props: dueDate: Date
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./DateCountDown.module.css";

//Types
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
        {/* number with commas */}
      </div>
      <div className={styles.unit}>Days</div>
    </div>
  );
};
