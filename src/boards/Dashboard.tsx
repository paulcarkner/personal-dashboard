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
import {
  LineChart,
  GoalChart,
  MapChart,
} from "./../features/DataChart/DataChart";

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
        <div className={boardStyles.MiniPanelsContainer}>
          <Panel title="Monthly Sales Goal" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample1.json"
              labelsProcessor={(data: any) => "Monthly Sales"}
              dataProcessor={(data: any) => {
                return {
                  value: data.monthly_sales["2023"].slice(-1)[0],
                  valueText: "$" + data.monthly_sales["2023"].slice(-1)[0],
                  goal: data.monthly_sales_goal,
                  goalText: "$" + data.monthly_sales_goal,
                };
              }}
            />
          </Panel>
        </div>
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
        <Panel title="Business Notes" info="localStorage Data">
          <Notes category="business" />
        </Panel>
        <Panel title="Personal Notes" info="localStorage Data">
          <Notes category="personal" />
        </Panel>
        <Panel
          title="Monthly Website Visitors"
          info="Visualization of JSON Data"
        >
          <LineChart
            url="/sample_data/sample1.json"
            labelsProcessor={(data: any) =>
              data.monthly_visits?.["2021"]?.map(
                (x: any, i: number) =>
                  [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ][i]
              )
            }
            dataProcessor={(data: any) =>
              Object.entries(data.monthly_visits || {})
            }
          />
        </Panel>
        <Panel title="Visitor Locations" info="API JSON" colSpan={2}>
          <MapChart
            url="/sample_data/sample1.json"
            labelsProcessor={() => null}
            dataProcessor={(data: any) => data.monthly_locations}
          />
        </Panel>
      </section>
    );
  }
}
