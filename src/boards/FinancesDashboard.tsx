/******************************************************************

           Name: FinancesDashboard
    Description: Dashboard for displaying financial api data
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
import { BarChart } from "./../features/DataChart/DataChartBar";
import { DisplayValue } from "./../features/DataChart/DataChartValue";
import { DoughnutChart } from "./../features/DataChart/DataChartDoughnut";
import { GoalChart } from "./../features/DataChart/DataChartGoal";
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import { DataList } from "./../features/DataList/DataList";
import { TransactionTemplate } from "./../features/DataList/Templates/TransactionTemplate";

//Types
type transactionType = {
  id: string;
  amount: number;
  company: string;
  transaction_date: Date;
  category: string;
};

export class FinancesDashboard extends React.Component {
  render() {
    return (
      <div className={styles.board}>
        <div className={styles.miniPanelsContainer}>
          <Panel title="Chequing Account Balance" info="JSON Data">
            <DisplayValue
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                return {
                  prepend: "$",
                  value: data.accounts["0048394_156842315"].funds
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`), //currency with commas, 2 decimals
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
                    .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`), //currency with commas, 2 decimals
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
                      .replace(/(\d)(?=(\d{3})+$)/g, `$1,`), //currency with commas, no decimals
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
        <div className={styles.panelsContainer}>
          <Panel
            title="Daily Account Balance"
            info="JSON Data Visualization"
            colSpan={2}
          >
            <BarChart
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                let runningBalance = data.accounts["0048394_156842315"].funds;
                let dailyBalance = [
                  { date: new Date().getDate(), balance: runningBalance }, //today's values
                ];

                //add previous days' values
                for (let x = 1; x < 30; x++) {
                  //loop through last 30 days in reverse order
                  let dailyTotal = 0;
                  let dateCode = new Date(
                    new Date().getTime() - x * 24 * 60 * 60 * 1000 //get dates for previous days
                  );
                  data.accounts[
                    "0048394_156842315"
                  ].recent_transactions.forEach((t: transactionType) => {
                    //if transaction was on current loop day add to running daily total
                    if (
                      new Date(t.transaction_date).toDateString() ===
                      dateCode.toDateString()
                    ) {
                      dailyTotal += t.amount;
                    }
                  });
                  runningBalance -= dailyTotal; //add to running multi-day total
                  dailyBalance.push({
                    date: dateCode.getDate(),
                    balance: runningBalance,
                  }); //add to array that will be used for graph
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
                  (transaction: transactionType, index: number) => {
                    if (transaction.category === "Deposit") return; //do not include deposits in expense summary
                    if (
                      !categories.some(
                        (category) => category.name === transaction.category
                      )
                    )
                      categories.push({ name: transaction.category, total: 0 }); //if current transacion category doesn't exist, add it
                    categories.forEach((category) => {
                      if (category.name === transaction.category)
                        category.total += transaction.amount; //add transaction about to category total
                    });
                  }
                );
                categories.sort((a, b) => (a.name < b.name ? -1 : 1)); //sort categories by name
                return {
                  labels: categories.map((category) => category.name),
                  values: categories.map((category) => category.total * -1),
                };
              }}
            />
          </Panel>
          <Panel title="Recent Transactions" info="JSON List Template">
            <DataList
              url="/sample_data/sample_bank_api.json"
              template={TransactionTemplate}
              dataProcessor={(data: any) => {
                return [
                  ...data.accounts["0048394_156842315"].recent_transactions,
                ] //clone for manipulation
                  .filter((t) => new Date(t.transaction_date) < new Date()) //only transactions in the past (sample data contains a large range of dates)
                  .sort((a, b) =>
                    new Date(a.transaction_date) > new Date(b.transaction_date)
                      ? -1
                      : 1
                  ) //sort by transaction date
                  .map((t: any) => {
                    return {
                      name: t.company,
                      date: new Date(t.transaction_date).toISOString(),
                      amount: t.amount,
                    };
                  });
              }}
            />
          </Panel>
        </div>
      </div>
    );
  }
}
