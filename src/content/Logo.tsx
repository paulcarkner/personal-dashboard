/*****************

Name: Logo
Description: Website logo
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Components
import { LogoIcon } from "./LogoIcon";

//Styles
import styles from "./Logo.module.css";

export function Logo(): JSX.Element {
  return (
    <div
      className={styles.Logo}
      title="Icon create by Shai Rilov from the Noun Project"
    >
      <LogoIcon className={styles.LogoIcon} />
      <span className={styles.LogoName}>dash-y</span>
    </div>
  );
}
