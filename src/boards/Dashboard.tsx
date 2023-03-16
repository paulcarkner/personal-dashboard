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
import { CurrentWeather } from "./../features/Weather/Weather";
import { GoalChart } from "./../features/DataChart/DataChartGoal";
import { DisplayValue } from "./../features/DataChart/DataChartValue";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import { Props as calendarType } from "./../features/DataList/Templates/CalendarTemplate";
import { BarChart } from "./../features/DataChart/DataChartBar";

//Type Declarations

export class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.Board}>
        <div className={styles.MiniPanelsContainer}>
          <Panel title="Unread Emails" info="JSON Data Visualization">
            <DisplayValue
              url="/sample_data/sample_email_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.emails.length,
                };
              }}
            />
          </Panel>
          <Panel title="Next Appointment" info="JSON Data Visualization">
            <DisplayValue
              url="/sample_data/sample_email_api.json"
              dataProcessor={(data: any) => {
                const nextEvent = [...data.schedule].sort(
                  (a: calendarType, b: calendarType) => {
                    return (
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                    );
                  }
                )[0];
                const st = new Date(nextEvent?.startTime);
                const et = new Date(
                  st.getTime() + nextEvent.duration * 60 * 1000
                );
                const days = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];

                return {
                  subValue:
                    days[st.getDay()] +
                    ", " +
                    st.getHours() +
                    ":" +
                    ("0" + st.getMinutes().toString()).slice(-2) +
                    " - " +
                    et.getHours() +
                    ":" +
                    ("0" + et.getMinutes().toString()).slice(-2),
                  value: nextEvent.name,
                };
              }}
            />
          </Panel>
          <Panel title="Monthly Sales Goal" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.monthly_sales["2023"].slice(-1)[0],
                  valueText:
                    "$" +
                    data.monthly_sales["2023"]
                      .slice(-1)[0]
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`),
                  goal: data.monthly_sales_goal,
                  goalText:
                    "$" +
                    data.monthly_sales_goal
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`),
                };
              }}
            />
          </Panel>
          <Panel title="Chequing Account Balance" info="JSON Data">
            <DisplayValue
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                return {
                  prepend: "$",
                  value: data.accounts["0048394_156842315"].funds
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`),
                };
              }}
            />
          </Panel>
          <Panel title="Days Until Trip" info="Date Count Down">
            <DateCountDown dueDate={new Date("2023-08-15")} />
          </Panel>
        </div>
        <div className={styles.PanelsContainer}>
          <Panel title="Current Weather (Toronto)" info="API JSON">
            <CurrentWeather
              lat={43.6534817}
              lon={-79.3839347}
              location="Toronto, ON"
            />
          </Panel>
          <Panel
            title="Last 7 Days of Steps"
            info="JSON Data Visualization"
            colSpan={2}
          >
            <BarChart
              url="/sample_data/sample_fitness_api.json"
              dataProcessor={(data: any) => {
                return {
                  labels: data.steps.map((stepCount: number, i: number) => {
                    return i === 6
                      ? "Today"
                      : new Date(
                          new Date().getTime() - (6 - i) * 24 * 60 * 60 * 1000
                        ).getDate();
                  }),
                  values: data.steps,
                };
              }}
            />
          </Panel>
        </div>
      </div>
    );
  }
}
