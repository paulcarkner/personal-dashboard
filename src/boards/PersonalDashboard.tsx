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
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import GoogleMap from "./../features/GoogleMap/GoogleMap";
// import {
//   LineChart,
//   GoalChart,
//   MapChart,
// } from "./../features/DataChart/DataChart";

//Type Declarations

export class PersonalDashboard extends React.Component {
  render() {
    return (
      <section className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}>
          <Panel title="Days Until Trip" info="Date Count Down">
            <DateCountDown dueDate={new Date("2023-08-15")} />
          </Panel>
        </div>
        <Panel title="Destination" info="Google Map" rowSpan={2}>
          <GoogleMap lng={-69.9316065} lat={18.486021} zoom={10} />
        </Panel>
      </section>
    );
  }
}
