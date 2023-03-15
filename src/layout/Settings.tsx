/*****************

Name: Settings
Description: A continer for settings at top of main
Props: (none)
Output: JSX.Element

*****************/

import React, { useEffect, useState, useRef } from "react";
import { AccountSettings } from "./../features/AccountSettings/AccountSettings";
import { DashboardSettings } from "./../features/DashboardSettings/DashboardSettings";

//Redux Imports
import { useAppSelector, useAppDispatch } from "./../app/hooks";

import {
  isDarkSelector,
  toggleDarkMode,
} from "./../features/DarkMode/DarkModeSlice";

//Styles
import styles from "./Settings.module.css";

export const Settings: React.FC = (): JSX.Element => {
  const isDark: boolean = useAppSelector(isDarkSelector);
  const dispatch = useAppDispatch();

  const accountDialogRef = useRef<HTMLDialogElement>(null);
  const settingsDialogRef = useRef<HTMLDialogElement>(null);
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

  const accountDialogHandler = () => {
    accountDialogRef.current?.showModal();
  };

  const handleCloseAccountDialog = () => {
    accountDialogRef.current?.close();
  };

  const settingsDialogHandler = () => {
    settingsDialogRef.current?.showModal();
  };

  const handleCloseSettingsDialog = () => {
    settingsDialogRef.current?.close();
  };

  return (
    <div className={styles.Settings}>
      <div className={styles.Note}>
        Note: Interface demonstration for portfolio.{" "}
        <a href="https://paulcarkner.dev" target="_blank" rel="noreferrer">
          https://paulcarkner.dev
        </a>
      </div>
      <button className={styles.Button}>
        <span className="material-symbols-sharp">search</span>
      </button>
      <button className={styles.Button} onClick={toggleDarkModeHandler}>
        <span className="material-symbols-sharp">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
      </button>
      <button className={styles.Button} onClick={accountDialogHandler}>
        <span className="material-symbols-sharp">account_circle</span>
      </button>
      <button className={styles.Button} onClick={settingsDialogHandler}>
        <span className="material-symbols-sharp">settings</span>
      </button>
      <div className={styles.Clock}>
        {(((t.getHours() % 12) - 12) % 12) + 12}
        {/* convert from 24-hour to 12 hour */}
        <span className={styles.ClockColon}>:</span>
        {("0" + t.getMinutes()).substr(-2)}
        {/* make minutes two digits */} {t.getHours() > 11 ? "PM" : "AM"}
      </div>
      <AccountSettings
        ref={accountDialogRef}
        closeDialog={handleCloseAccountDialog}
      />
      <DashboardSettings
        ref={settingsDialogRef}
        closeDialog={handleCloseSettingsDialog}
      />
    </div>
  );
};
