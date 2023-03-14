/*****************

Name: Dashboard
Description: Container for the summary board
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
// import { RssFeed } from "./../features/RssFeed/RssFeed";
import { CurrentWeather } from "./../features/Weather/Weather";
import { Notes } from "./../features/Notes/Notes";
// import { GoalChart } from "./../features/DataChart/DataChart";

//Type Declarations

export class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.Board}>
        {/* <div className={styles.MiniPanelsContainer}></div> */}
        <div className={styles.PanelsContainer}>
          <Panel title="Current Weather (Toronto)" info="API JSON">
            <CurrentWeather
              lat={43.6534817}
              lon={-79.3839347}
              location="Toronto, ON"
            />
          </Panel>
          <Panel title="Business Notes" info="localStorage Data">
            <Notes category="business" />
          </Panel>
        </div>
      </div>
    );
  }
}
