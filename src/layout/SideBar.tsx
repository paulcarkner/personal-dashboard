/*****************

Name: SideBar
Description: The side menu for the website
Props: (none)
Output: JSX.Element

*****************/

import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

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
      <nav className={styles.LinkList}>
        <NavLink
          to="/"
          className={({ isActive }: any) =>
            isActive ? styles.ActiveLink : styles.NavLink
          }
        >
          <span className="material-symbols-sharp">home</span>
          <span>Home</span>
        </NavLink>
        <hr className={styles.NavLine} />
        <NavLink
          to="/personal"
          className={({ isActive }: any) =>
            isActive ? styles.ActiveLink : styles.NavLink
          }
        >
          <span className="material-symbols-sharp">person</span>
          <span>Personal</span>
        </NavLink>
        <NavLink
          to="/website"
          className={({ isActive }: any) =>
            isActive ? styles.ActiveLink : styles.NavLink
          }
        >
          <span className="material-symbols-sharp">link</span>
          <span>Website</span>
        </NavLink>
        <NavLink
          to="/vacation"
          className={({ isActive }: any) =>
            isActive ? styles.ActiveLink : styles.NavLink
          }
        >
          <span className="material-symbols-sharp">flight</span>
          <span>Vacation</span>
        </NavLink>
        <NavLink
          to="/finances"
          className={({ isActive }: any) =>
            isActive ? styles.ActiveLink : styles.NavLink
          }
        >
          <span className="material-symbols-sharp">paid</span>
          <span>Finances</span>
        </NavLink>
      </nav>
    </header>
  );
}
