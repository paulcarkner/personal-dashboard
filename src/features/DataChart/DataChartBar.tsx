/******************************************************************

           Name: BarChart
    Description: A bar chart graph of the given data
    Return Type: JSX.Element
          Props: url: string
                 dataProcessor(data) => {labels: Array<string>, values: Array<number>}
  Redux Actions: fetchDataSource(url: string)
Redux Selectors: dataChartSelector

******************************************************************/

import React, { useEffect } from "react";

//Styles
import styles from "./DataChart.module.css";

//Components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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
ChartJS.register(CategoryScale, LinearScale, Tooltip, BarElement);

export const BarChart = ({ url, dataProcessor }: props): JSX.Element => {
  const dataChartState: dataChartStateType = useAppSelector(
    dataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0]; //get data for passed url
  const dispatch = useAppDispatch();

  //fetchData if doesn't exist
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
        <Bar
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
                display: false,
              },
              title: {
                display: false,
              },
            },
          }}
          data={{
            labels: dataProcessor(dataChart.data).labels,
            datasets: [
              {
                backgroundColor: getCssValue("--theme-accent-primary"),
                borderColor: getCssValue("--theme-accent-secondary"),
                borderWidth: 2,
                data: dataProcessor(dataChart.data).values,
              },
            ],
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
