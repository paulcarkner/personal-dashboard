import React from "react";

import boardStyles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import {
  BarChart,
  DoughnutChart,
  GoalChart,
  DisplayValue,
} from "./../features/DataChart/DataChart";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";

export class FinancesDashboard extends React.Component {
  render() {
    return (
      <div className={boardStyles.Board}>
        <div className={boardStyles.MiniPanelsContainer}>
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
          <Panel title="Savings Account Balance" info="JSON Data">
            <DisplayValue
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                return {
                  prepend: "$",
                  value: data.accounts["0048394_482904757"].funds
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`),
                };
              }}
            />
          </Panel>
          <Panel title="Retirement Savings" info="JSON Data Chart">
            <GoalChart
              url="/sample_data/sample_bank_api.json"
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
        <div className={boardStyles.PanelsContainer}>
          <Panel
            title="Daily Account Balance"
            info="JSON Data Visualization"
            colSpan={2}
          >
            <BarChart
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                let transactions = [
                  ...data.accounts["0048394_156842315"].recent_transactions,
                ];
                transactions.sort((a, b) =>
                  a.transaction_date < b.transaction_date ? -1 : 1
                );
                let runningBalance = data.accounts["0048394_156842315"].funds;
                let dailyBalance = [
                  { date: new Date().getDate(), balance: runningBalance },
                ];

                for (let x = 1; x < 30; x++) {
                  let dailyTotal = 0;
                  let dateCode = new Date(
                    new Date().getTime() - x * 24 * 60 * 60 * 1000
                  );
                  transactions.forEach(
                    (t: {
                      id: string;
                      amount: number;
                      company: string;
                      transaction_date: Date;
                      category: string;
                    }) => {
                      if (
                        new Date(t.transaction_date).toDateString() ===
                        dateCode.toDateString()
                      ) {
                        dailyTotal += t.amount;
                      }
                    }
                  );
                  runningBalance -= dailyTotal;
                  dailyBalance.push({
                    date: dateCode.getDate(),
                    balance: runningBalance,
                  });
                }

                dailyBalance.reverse();

                return {
                  labels: dailyBalance.map((d) => d.date),
                  values: dailyBalance.map((d) => d.balance),
                };
              }}
            />
          </Panel>
          <Panel title="Expense Categories" info="JSON Data Visualization">
            <DoughnutChart
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                let categories: Array<{ name: string; total: number }> = [];
                data.accounts["0048394_156842315"].recent_transactions.forEach(
                  (
                    transaction: {
                      id: string;
                      amount: number;
                      company: string;
                      transaction_date: Date;
                      category: string;
                    },
                    index: number
                  ) => {
                    if (transaction.category === "Deposit") return;
                    if (
                      !categories.some(
                        (category) => category.name === transaction.category
                      )
                    )
                      categories.push({ name: transaction.category, total: 0 });
                    categories.forEach((category) => {
                      if (category.name === transaction.category)
                        category.total += transaction.amount;
                    });
                  }
                );
                categories.sort((a, b) => (a.name < b.name ? -1 : 1));
                return {
                  labels: categories.map((category) => category.name),
                  values: categories.map((category) => category.total * -1),
                };
              }}
            />
          </Panel>
        </div>
      </div>
    );
  }
}
