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
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  x: any;
  y: any;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ url, x, y }: Props): JSX.Element => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataChartState: DataChartStateType = useAppSelector(
    DataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  );
  const dispatch = useAppDispatch();

  dispatch(FetchDataSource({ url }));

  return (
    <div className={styles.ChartContainer}>
      <Line
        className={styles.FillContainer}
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
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
              display: false,
            },
            title: {
              display: false,
              text: "Chart.js",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Dataset 1",
              data: [55, 150, 78, 66, 120, 182, 40],
              borderColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-primary"
              ),
              backgroundColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-primary"
              ),
              tension: 0.3,
            },
            {
              label: "Dataset 2",
              data: [35, 112, 68, 83, 112, 144, 54],
              borderColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-secondary"
              ),
              backgroundColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-secondary"
              ),
              tension: 0.3,
            },
            {
              label: "Dataset 3",
              data: [65, 198, 88, 46, 144, 155, 78],
              borderColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-tertiary"
              ),
              backgroundColor: getComputedStyle(document.body).getPropertyValue(
                "--theme-accent-tertiary"
              ),
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
};
