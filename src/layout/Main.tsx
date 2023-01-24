/*****************

Name: Main
Description: The main content container
Props: (none)
Output: JSX.Element

*****************/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import { Settings } from "./Settings";
import { Dashboard } from "./../boards/Dashboard";

//Styles
import styles from "./Main.module.css";

export function Main(): JSX.Element {
  return (
    <main className={styles.Main}>
      <Settings />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </main>
  );
}
