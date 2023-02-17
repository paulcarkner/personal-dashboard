import React from "react";

//Import Features
//import { Sample } from "./features/_sample/_sample";
import { Main } from "./layout/Main";
import { SideBar } from "./layout/SideBar";
import { BrowserRouter as Router } from "react-router-dom";

//Styles
import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <Router>
      <div className={styles.App}>
        <SideBar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
