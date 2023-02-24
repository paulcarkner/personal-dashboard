/*****************

Name: Settings
Description: A continer for settings at top of main
Props: (none)
Output: JSX.Element

*****************/

import React, { useEffect, useState } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "./../app/hooks";

import {
  isDarkSelector,
  toggleDarkMode,
} from "./../features/DarkMode/DarkModeSlice";

//Styles
import styles from "./Settings.module.css";

//Type Declarations

export const Settings: React.FC = (): JSX.Element => {
  const isDark: boolean = useAppSelector(isDarkSelector);
  const dispatch = useAppDispatch();

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

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={styles.Settings}>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">search</span>
      </button>
      <button className={styles.Button} onClick={toggleDarkModeHandler}>
        <span className="material-symbols-sharp">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
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
