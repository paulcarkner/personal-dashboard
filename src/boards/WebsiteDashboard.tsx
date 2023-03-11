import React from "react";

import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import { Notes } from "./../features/Notes/Notes";
import { LineChart } from "./../features/DataChart/DataChartLine";
import { GoalChart } from "./../features/DataChart/DataChartGoal";
import { MapChart } from "./../features/DataChart/DataChartMap";
import { DataList } from "./../features/DataList/DataList";
import { TransactionTemplate } from "./../features/DataList/Templates/TransactionTemplate";

export class WebsiteDashboard extends React.Component {
  render() {
    return (
      <div className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}>
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
          <Panel title="New Accounts" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.monthly_new_accounts["2023"].slice(-1)[0],
                  valueText: data.monthly_new_accounts["2023"].slice(-1)[0],
                  goal: 75,
                  goalText: "75",
                };
              }}
            />
          </Panel>
          <Panel title="Bandwidth Limit" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.bandwidth_usage,
                  valueText: data.bandwidth_usage.toFixed(2) + "GB",
                  goal: data.bandwidth_limit,
                  goalText: data.bandwidth_limit.toFixed(2) + "GB",
                  goalLabel: "Limit",
                };
              }}
            />
          </Panel>
          <Panel title="Avg. Server Response" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.server_response,
                  valueText: data.server_response.toString() + "ms",
                  goal: 75,
                  goalText: "75ms",
                  goalLabel: "Threshold",
                };
              }}
            />
          </Panel>
          <Panel title="Database Size" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.database_total,
                  valueText: data.database_total.toString() + "MB",
                  goal: 1024,
                  goalText: "1,024MB",
                  goalLabel: "Limit",
                };
              }}
            />
          </Panel>
          <Panel title="Storage Size" info="Visualization of JSON Data">
            <GoalChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.storage_total,
                  valueText: data.storage_total.toString() + "MB",
                  goal: 256,
                  goalText: "256MB",
                  goalLabel: "Limit",
                };
              }}
            />
          </Panel>
        </div>
        <div className={boardStyles.PanelsContainer}>
          <Panel title="Website Tasks" info="localStorage Data" rowSpan={2}>
            <Notes category="website" />
          </Panel>
          <Panel
            title="Monthly Website Visitors"
            info="Visualization of JSON Data"
            colSpan={2}
          >
            <LineChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => {
                return {
                  labels: [
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
                  ],
                  values: Object.entries(data.monthly_visits || {}),
                };
              }}
            />
          </Panel>
          <Panel title="Recent Transactions" info="JSON List Template">
            <DataList
              url="/sample_data/sample_website_stats_api.json"
              template={TransactionTemplate}
              dataProcessor={(data: any) => {
                return data.recent_transactions.map((t: any) => {
                  return {
                    name: t.id,
                    date: t.payment_date,
                    amount: t.total,
                  };
                });
              }}
            />
          </Panel>
          <Panel title="Visitor Locations" info="API JSON" colSpan={2}>
            <MapChart
              url="/sample_data/sample_website_stats_api.json"
              dataProcessor={(data: any) => data.monthly_locations}
            />
          </Panel>
        </div>
      </div>
    );
  }
}
