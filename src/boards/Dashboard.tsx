/******************************************************************

           Name: Dashboard
    Description: Summary dashboard and landing page
    Return Type: JSX.Element
          Props: (none)
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import { CurrentWeather } from "./../features/Weather/Weather";
import { GoalChart } from "./../features/DataChart/DataChartGoal";
import { DisplayValue } from "./../features/DataChart/DataChartValue";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import { props as calendarType } from "./../features/DataList/Templates/CalendarTemplate";
import { BarChart } from "./../features/DataChart/DataChartBar";
import { DoughnutChart } from "./../features/DataChart/DataChartDoughnut";

export class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.board}>
        <div className={styles.miniPanelsContainer}>
          {/* Unread Emails - DisplayValue */}
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
          {/* Next Appointment - DisplayValue */}
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
                )[0]; //sort by start time and get first event
                if (!nextEvent) return { value: "--" };

                //get date details
                const st = new Date(nextEvent.startTime);
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
                    ("0" + et.getMinutes().toString()).slice(-2), //example: "Sunday, 15:05 - 16:20"
                  value: nextEvent.name,
                };
              }}
            />
          </Panel>
          {/* Monthly Sales Goal - GoalChart */}
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
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`), //currency w/ commas, no decimals
                  goal: data.monthly_sales_goal,
                  goalText:
                    "$" +
                    data.monthly_sales_goal
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`), //currency w/ commas, no decimals
                };
              }}
            />
          </Panel>
          {/* Chequing Balance-  DisplayValue */}
          <Panel title="Chequing Account Balance" info="JSON Data">
            <DisplayValue
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                return {
                  prepend: "$",
                  value: data.accounts["0048394_156842315"].funds
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`), //currency w/ commas, 2 decimals
                };
              }}
            />
          </Panel>
          {/* Trip Count Down - DateCountDown */}
          <Panel title="Days Until Trip" info="Date Count Down">
            <DateCountDown dueDate={new Date("2023-08-15")} />
          </Panel>
          <Panel title="Daily Step Goal" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_fitness_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.steps.at(-1),
                  valueText: data.steps
                    .at(-1)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, `$1,`), //get most recent step count, add number commas
                  goal: 10000,
                  goalText: "10,000",
                  goalLabel: "Goal",
                };
              }}
            />
          </Panel>
        </div>
        <div className={styles.panelsContainer}>
          {/* Weather - Current Weather */}
          <Panel title="Current Weather (Toronto)" info="API JSON">
            <CurrentWeather
              lat={43.6534817}
              lon={-79.3839347}
              location="Toronto, ON"
            />
          </Panel>
          {/* Daily Steps - BarChart */}
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
                          new Date().getTime() - (6 - i) * 24 * 60 * 60 * 1000 // get date number for previous days
                        ).getDate();
                  }),
                  values: data.steps,
                };
              }}
            />
          </Panel>
          {/* Workout Chart - DoughnutChart */}
          <Panel title="Last Workout Intensity" info="JSON Data Visualization">
            <DoughnutChart
              url="/sample_data/sample_fitness_api.json"
              dataProcessor={(data: any) => {
                return {
                  labels: Object.keys(data.intensity),
                  values: Object.keys(data.intensity).map(
                    (intensityLevelName: string) =>
                      data.intensity[intensityLevelName]
                  ),
                };
              }}
            />
          </Panel>
        </div>
      </div>
    );
  }
}
