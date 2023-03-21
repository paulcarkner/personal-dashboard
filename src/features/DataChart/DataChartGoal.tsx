/******************************************************************

           Name: GoalChart
    Description: A number and pie chart graph of the given data
    Return Type: JSX.Element
          Props: url: string
                 dataProcessor(data) => {value: number, valueText: string, goal: number, goalText: string}
  Redux Actions: fetchDataSource(url: string)
Redux Selectors: dataChartSelector

******************************************************************/

import React, { useEffect } from "react";

//Styles
import styles from "./DataChart.module.css";

//Components
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCssValue } from "./DataChartAPI";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  dataChartStateType,

  //actions
  fetchDataSource,

  //selectors
  dataChartStateSelector,
} from "./DataChartSlice";

//Types
type props = {
  url: string;
  dataProcessor: Function;
};

//Utility Functions
ChartJS.register(ArcElement);

export const GoalChart = ({ url, dataProcessor }: props): JSX.Element => {
  const dataChartState: dataChartStateType = useAppSelector(
    dataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0]; //get data for passed url
  const dispatch = useAppDispatch();

  //get theme colors from CSS for graph
  const colorArray = [
    getCssValue("--theme-accent-primary"),
    getCssValue("--theme-accent-secondary"),
    getCssValue("--theme-accent-tertiary"),
  ];

  //fetchData if doesn't exist
  useEffect(() => {
    if (dataChart?.url !== url) dispatch(fetchDataSource({ url }));
  });

  return dataChart?.data !== undefined ? (
    <div
      className={`${styles.goalGrid} ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      <div className={styles.goalText}>
        <div className={styles.goalValue}>
          {dataProcessor(dataChart.data).valueText}
        </div>
        <div className={styles.goalTarget}>
          {dataProcessor(dataChart.data).goalLabel ?? "Goal"}:{" "}
          {dataProcessor(dataChart.data).goalText}
        </div>
      </div>
      <div className={styles.goalChartContainer}>
        <div className={styles.doughnutValue}>
          {(
            (dataProcessor(dataChart.data).value /
              dataProcessor(dataChart.data).goal) *
            100
          ).toFixed(0)}
          %
        </div>
        <Doughnut
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            cutout: "65%",
          }}
          data={{
            datasets: [
              {
                data: [
                  dataProcessor(dataChart.data).value,
                  Math.max(
                    dataProcessor(dataChart.data).goal -
                      dataProcessor(dataChart.data).value,
                    0
                  ),
                ],
                backgroundColor: [
                  colorArray[2].replace(")", ", 75%)"), //make slightly transparent
                  colorArray[0].replace(")", ", 25%)"), //make slightly transparent
                ],
                borderColor: [colorArray[2], "transparent"],
                borderWidth: [3, 0],
              },
            ],
          }}
          updateMode="default"
          redraw={true}
        />
      </div>
    </div>
  ) : (
    <div
      className={
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }
    >
      Loading...
    </div>
  );
};
