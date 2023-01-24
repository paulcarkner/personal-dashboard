/*****************

Name: Settings
Description: A continer for settings at top of main
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./Settings.module.css";

//Type Declarations

export const Settings = (): JSX.Element => {
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
    </div>
  );
};
