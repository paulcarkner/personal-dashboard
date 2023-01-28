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
import { CurrentWeather } from "./../features/Weather/WeatherTest";

//Type Declarations

export class Dashboard extends React.Component {
  constructor(props: any) {
    super(props);
  }

  handleLoadingChange = (e: any) => {
    console.log(e);
  };

  render() {
    return (
      <section className={boardStyles.Board}>
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
        <Panel title="Current Weather (Dominican Republic)" info="API JSON">
          <CurrentWeather
            lat={18.5001}
            lon={-69.9886}
            location="Santo Domingo"
          />
        </Panel>
      </section>
    );
  }
}
