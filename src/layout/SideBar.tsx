import React from "react";

//Styles
import styles from "./SideBar.module.css";

//Components
import { Logo } from "./../content/Logo";

export function SideBar(): JSX.Element {
  return (
    <header className={styles.SideBar}>
      <div className={styles.Logo}>
        <Logo />
      </div>
    </header>
  );
}
