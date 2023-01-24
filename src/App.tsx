import React from "react";

//Import Features
//import { Sample } from "./features/_sample/_sample";
import { Main } from "./layout/Main";
import { SideBar } from "./layout/SideBar";

//Styles
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <SideBar />
      <Main />
    </div>
  );
}

export default App;
