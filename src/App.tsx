import React from "react";

//Styles
import styles from "./App.module.css";

//Components
import { Main } from "./layout/Main";
import { SideBar } from "./layout/SideBar";
import { BrowserRouter as Router } from "react-router-dom";

//Redux Imports
import { useAppSelector } from "./app/hooks";
import { isDarkSelector } from "./features/DarkMode/DarkModeSlice";

function App(): JSX.Element {
  const isDark: boolean = useAppSelector(isDarkSelector);

  return (
    <Router>
      <div
        id="App"
        className={`${styles.app} ${isDark ? styles.dark : styles.light}`}
      >
        <SideBar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
