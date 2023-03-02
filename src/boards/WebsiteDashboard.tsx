import React from "react";

import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import GoogleMap from "./../features/GoogleMap/GoogleMap";
import { ImageLink } from "./../features/ImageLink/ImageLink";
import { Notes } from "./../features/Notes/Notes";
import {
  LineChart,
  GoalChart,
  MapChart,
} from "./../features/DataChart/DataChart";

export class WebsiteDashboard extends React.Component {
  render() {
    return (
      <div className={boardStyles.Board}>
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
        <div className={boardStyles.PanelsContainer}>
          <Panel
            title="Monthly Website Visitors"
            info="Visualization of JSON Data"
            colSpan={2}
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
        </div>
      </div>
    );
  }
}
