/******************************************************************

           Name: Logo
    Description: Website logo at top of Sidebar
    Return Type: JSX.Element
          Props: (none)
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Components
import { LogoIcon } from "./LogoIcon";

//Styles
import styles from "./Logo.module.css";

export function Logo(): JSX.Element {
  return (
    <div
      className={styles.logo}
      title="Icon create by Shai Rilov from the Noun Project"
    >
      <LogoIcon className={styles.logoIcon} />
      <span className={styles.logoName}>dash-y</span>
    </div>
  );
}
