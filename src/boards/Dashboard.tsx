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
import { CurrentWeather } from "./../features/CurrentWeather/CurrentWeather";

//Type Declarations

export const Dashboard = (): JSX.Element => {
  return (
    <section className={boardStyles.Board}>
      <Panel title="Latest Movie Trailers (RSS Feed)">
        <RssFeed url="https://trailers.apple.com/trailers/home/rss/newtrailers.rss" />
      </Panel>
      <Panel title="Current Weather (API JSON)">
        <CurrentWeather />
      </Panel>
    </section>
  );
};
