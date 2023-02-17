/*****************

Name: Main
Description: The main content container
Props: (none)
Output: JSX.Element

*****************/

import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import { Settings } from "./Settings";
import { Dashboard } from "./../boards/Dashboard";
import { PersonalDashboard } from "./../boards/PersonalDashboard";

//Styles
import styles from "./Main.module.css";

export function Main(): JSX.Element {
  return (
    <main className={styles.Main}>
      <Settings />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/personal" element={<PersonalDashboard />} />
      </Routes>
    </main>
  );
}
