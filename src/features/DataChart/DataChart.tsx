/*****************

Name: DataChart
Description: Takes data from Redux and given object selectors
Props: *******************************************************************
Output: JSX.Element

*****************/

import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { AppDispatch } from "../../app/store";

import {
  //types
  DataChartStateType,

  //actions
  FetchDataSource,

  //selectors
  DataChartStateSelector,
} from "./DataChartSlice";

//Styles
import styles from "./DataChart.module.css";

//Components

//Type Declarations
type Props = {
  url: string;
  labelsProcessor: Function;
  dataProcessor: Function;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({
  url,
  labelsProcessor,
  dataProcessor,
}: Props): JSX.Element => {
  const dataChartState: DataChartStateType = useAppSelector(
    DataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();
  const colorArray = [
    getComputedStyle(document.body).getPropertyValue("--theme-accent-primary"),
    getComputedStyle(document.body).getPropertyValue(
      "--theme-accent-secondary"
    ),
    getComputedStyle(document.body).getPropertyValue("--theme-accent-tertiary"),
  ];

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(FetchDataSource({ url }));
  });

  return (
    <div className={styles.ChartContainer}>
      {dataChart?.data !== undefined ? (
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: getComputedStyle(document.body).getPropertyValue(
                    "--theme-text-tertiary"
                  ),
                },
              },
              y: {
                grid: {
                  color: getComputedStyle(document.body).getPropertyValue(
                    "--theme-text-tertiary"
                  ),
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
                },
              },
              title: {
                display: false,
              },
            },
          }}
          data={{
            labels: labelsProcessor(dataChart.data),
            datasets: dataProcessor(dataChart.data).map((d: any, i: number) => {
              return {
                label: " " + d[0],
                data: d[1],
                pointRadius: 5,
                pointBorderColor: colorArray[i % 3],
                pointBorderWidth: 2,
                pointBackgroundColor: colorArray[i % 3].replace(")", ", 75%)"), //make slightly transparent
                borderColor: colorArray[i % 3],
                borderWidth: 1.5,
                backgroundColor: "transparent",
                tension: 0.5,
              };
            }),
          }}
          updateMode="default"
          redraw={true}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export const GoalChart = ({
  url,
  labelsProcessor,
  dataProcessor,
}: Props): JSX.Element => {
  const dataChartState: DataChartStateType = useAppSelector(
    DataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();
  const colorArray = [
    getComputedStyle(document.body).getPropertyValue("--theme-accent-primary"),
    getComputedStyle(document.body).getPropertyValue(
      "--theme-accent-secondary"
    ),
    getComputedStyle(document.body).getPropertyValue("--theme-accent-tertiary"),
  ];

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(FetchDataSource({ url }));
  });

  return dataChart?.data !== undefined ? (
    <div className={styles.GoalGrid}>
      <div className={styles.GoalText}>
        <div className={styles.GoalValue}>
          {dataProcessor(dataChart.data).valueText}
        </div>
        <div className={styles.GoalTarget}>
          Goal: {dataProcessor(dataChart.data).goalText}
        </div>
      </div>
      <div className={styles.GoalChartContainer}>
        <div className={styles.DoughnutValue}>
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
            labels: [labelsProcessor(dataChart.data), "Goal"],
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
    <div>Loading...</div>
  );
};
