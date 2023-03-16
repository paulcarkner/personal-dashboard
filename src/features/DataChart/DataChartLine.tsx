/*****************

Name: DataChart
Description: Takes data from Redux and given object selectors
Props: *******************************************************************
Output: JSX.Element

*****************/

import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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

//Styles
import styles from "./DataChart.module.css";

//Type Declarations
type props = {
  url: string;
  dataProcessor: Function;
};

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function getCssValue(param: string) {
  const appEl = document.getElementById("App");
  return getComputedStyle(
    appEl || document.createElement("div")
  ).getPropertyValue(param);
}

export const LineChart = ({ url, dataProcessor }: props): JSX.Element => {
  const dataChartState: dataChartStateType = useAppSelector(
    dataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();
  const colorArray = [
    getCssValue("--theme-accent-primary"),
    getCssValue("--theme-accent-secondary"),
    getCssValue("--theme-accent-tertiary"),
  ];

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(fetchDataSource({ url }));
  });

  return (
    <div
      className={`${styles.chartContainer} ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      {dataChart?.data !== undefined ? (
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: getCssValue("--theme-text-tertiary"),
                },
              },
              y: {
                grid: {
                  color: getCssValue("--theme-text-tertiary"),
                },
                suggestedMin: 0,
              },
            },
            plugins: {
              legend: {
                position: "top" as const,
                display: true,
                labels: {
                  usePointStyle: true,
                  color: getCssValue("--theme-text-primary"),
                },
              },
              title: {
                display: false,
              },
            },
          }}
          data={{
            labels: dataProcessor(dataChart.data).labels,
            datasets: dataProcessor(dataChart.data).values.map(
              (d: any, i: number) => {
                return {
                  label: " " + d[0],
                  data: d[1],
                  pointRadius: 5,
                  pointBorderColor: colorArray[i % 3],
                  pointBorderWidth: 2,
                  pointBackgroundColor: colorArray[i % 3].replace(
                    ")",
                    ", 75%)"
                  ), //make slightly transparent
                  borderColor: colorArray[i % 3],
                  borderWidth: 1.5,
                  backgroundColor: "transparent",
                  tension: 0.5,
                };
              }
            ),
          }}
          updateMode="default"
          redraw={true}
        />
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
      )}
    </div>
  );
};
