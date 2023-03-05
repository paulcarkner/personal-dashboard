import React from "react";

import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import { GoalChart } from "./../features/DataChart/DataChart";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";

export class FinancesDashboard extends React.Component {
  render() {
    return (
      <div className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}>
          <Panel title="Retirement Savings" info="JSON Data Chart">
            <GoalChart
              url="/sample_data/sample_bank_api.json"
              labelsProcessor={(data: any) => "Vacation Savings"}
              dataProcessor={(data: any) => {
                return {
                  value: data.accounts["0048394_485125813"].funds,
                  valueText:
                    "$" +
                    data.accounts["0048394_485125813"].funds
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`),
                  goal: 1000000,
                  goalText: "$1,000,000",
                };
              }}
            />
          </Panel>
          <Panel title="Days Until Retirement" info="Date Count Down">
            <DateCountDown dueDate={new Date("2043-06-30")} />
          </Panel>
        </div>
      </div>
    );
  }
}
