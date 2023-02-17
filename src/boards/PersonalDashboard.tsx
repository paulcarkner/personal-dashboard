/*****************

Name: PersonalDashboard
Description: Container for the summary board
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
// import { RssFeed } from "./../features/RssFeed/RssFeed";
// import { CurrentWeather } from "./../features/Weather/Weather";
// import { Notes } from "./../features/Notes/Notes";
// import {
//   LineChart,
//   GoalChart,
//   MapChart,
// } from "./../features/DataChart/DataChart";

//Type Declarations

export class PersonalDashboard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <section className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}>
          <Panel title="Test" info=""></Panel>
        </div>
      </section>
    );
  }
}
