/*****************

Name: Settings
Description: A continer for settings at top of main
Props: (none)
Output: JSX.Element

*****************/

import React, { useEffect, useState } from "react";

//Styles
import styles from "./Settings.module.css";

//Type Declarations

export const Settings = (): JSX.Element => {
  const [t, setTime] = useState(new Date()); //create clock state

  //update clock every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.Settings}>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">search</span>
      </button>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">dark_mode</span>
      </button>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">account_circle</span>
      </button>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">settings</span>
      </button>
      <div className={styles.Clock}>
        {(((t.getHours() % 12) - 12) % 12) + 12}
        {/* convert from 24-hour to 12 hour */}
        <span className={styles.ClockColon}>:</span>
        {("0" + t.getMinutes()).substr(-2)}
        {/* make minutes two digits */} {t.getHours() > 11 ? "PM" : "AM"}
      </div>
    </div>
  );
};
