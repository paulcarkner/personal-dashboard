/*****************

Name: Main
Description: The main content container
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Components
import { Panel } from "./Panel";

//Styles
import styles from "./Main.module.css";

export function Main(): JSX.Element {
  return (
    <main className={styles.Main}>
      <Panel title="hello world!">
        <button>Click me!</button>
      </Panel>
    </main>
  );
}
