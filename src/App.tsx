import React from "react";

//Import Features
//import { Sample } from "./features/_sample/_sample";
import { Main } from "./layout/Main";
import { SideBar } from "./layout/SideBar";
import { BrowserRouter as Router } from "react-router-dom";

//Redux Imports
import { useAppSelector } from "./app/hooks";
import { isDarkSelector } from "./features/DarkMode/DarkModeSlice";

//Styles
import styles from "./App.module.css";

function App(): JSX.Element {
  const isDark: boolean = useAppSelector(isDarkSelector);

  return (
    <Router>
      <div
        id="App"
        className={`${styles.App} ${isDark ? styles.Dark : styles.Light}`}
      >
        <SideBar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
