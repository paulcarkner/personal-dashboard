/*****************

Name: SideBar
Description: The side menu for the website
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./SideBar.module.css";

//Components
import { NavLink } from "react-router-dom";
import { Logo } from "./../content/Logo/Logo";

export function SideBar(): JSX.Element {
  return (
    <header className={styles.sideBar}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.avatar}>
        <img alt="Avatar" src="assets/profile_image.jpg" />
      </div>
      <nav className={styles.linkList}>
        <NavLink
          to="/"
          className={({ isActive }: any) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          <span className="material-symbols-sharp">home</span>
          <span>Home</span>
        </NavLink>
        <hr className={styles.navLine} />
        <NavLink
          to="/personal"
          className={({ isActive }: any) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          <span className="material-symbols-sharp">person</span>
          <span>Personal</span>
        </NavLink>
        <NavLink
          to="/website"
          className={({ isActive }: any) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          <span className="material-symbols-sharp">link</span>
          <span>Website</span>
        </NavLink>
        <NavLink
          to="/vacation"
          className={({ isActive }: any) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          <span className="material-symbols-sharp">flight</span>
          <span>Vacation</span>
        </NavLink>
        <NavLink
          to="/finances"
          className={({ isActive }: any) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          <span className="material-symbols-sharp">paid</span>
          <span>Finances</span>
        </NavLink>
      </nav>
    </header>
  );
}
