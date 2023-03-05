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
import { RssFeed } from "./../features/RssFeed/RssFeed";
import { CurrentWeather } from "./../features/Weather/Weather";
import { Notes } from "./../features/Notes/Notes";
import { GoalChart } from "./../features/DataChart/DataChart";

//Type Declarations

export class Dashboard extends React.Component {
  render() {
    return (
      <div className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}></div>
        <div className={boardStyles.PanelsContainer}>
          <Panel title="Latest Movie Trailers" info="RSS Feed">
            <RssFeed url="https://trailers.apple.com/trailers/home/rss/newtrailers.rss" />
          </Panel>
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
