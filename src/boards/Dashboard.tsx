/*****************

Name: Dashboard
Description: Container for the summary board
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";

//Type Declarations

export const Dashboard = (): JSX.Element => {
  return (
    <section className={boardStyles.Board}>
      <Panel title="Something">
        <button>Click me!</button>
      </Panel>
    </section>
  );
};
