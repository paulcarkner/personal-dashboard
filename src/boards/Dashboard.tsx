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

//Type Declarations

export const Dashboard = (): JSX.Element => {
  return (
    <section className={boardStyles.Board}>
      <Panel title="Latest Movie Trailers">
        <RssFeed url="https://trailers.apple.com/trailers/home/rss/newtrailers.rss" />
      </Panel>
    </section>
  );
};
