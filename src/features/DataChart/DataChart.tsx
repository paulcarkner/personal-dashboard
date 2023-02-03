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

//types

//actions

//selectors

//Styles
import styles from "./DataChart.module.css";

//Components

//Type Declarations
type Props = {
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

export const LineChart = ({ x, y }: Props): JSX.Element => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  return (
    <div className={styles.ChartContainer}>
      <Line
        className={styles.FillContainer}
        options={{
          responsive: true,
          maintainAspectRatio: false,
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
              data: labels.map((x: string, i: number) =>
                Math.pow((i - 3) * 2, 3)
              ),
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
              data: labels.map((x: string, i: number) => 85 - i * i * 10),
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
              data: labels.map((x: string, i: number) => 35 + i * 10),
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
