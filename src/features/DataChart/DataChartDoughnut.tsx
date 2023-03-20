/******************************************************************

           Name: DoughnutChart
    Description: A doughnut (pie) chart graph of the given data
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCssValue } from "./DataChartUtilities";

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
ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ url, dataProcessor }: props): JSX.Element => {
  const dataChartState: dataChartStateType = useAppSelector(
    dataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0]; //get data for passed url
  const dispatch = useAppDispatch();

  //get theme colors from CSS for graph
  const primaryColor = getCssValue("--theme-accent-primary") || "hsl(0,0%,0%)";
  const colorHue = parseInt(
    primaryColor?.substring(
      primaryColor.indexOf("(") + 1,
      primaryColor.indexOf(",")
    )
  );
  const colorSat = parseInt(
    primaryColor
      .split(",")[1]
      .substring(0, primaryColor.split(",")[1].indexOf("%"))
  ); //theme saturation value to use for spectrum of colours

  //fetchData if doesn't exist
  useEffect(() => {
    if (dataChart?.url !== url) dispatch(fetchDataSource({ url }));
  });

  return dataChart?.data !== undefined ? (
    <div
      className={`${styles.chartContainer} ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      <Doughnut
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: getCssValue("--theme-text-primary") },
            },
          },
          cutout: "65%",
        }}
        data={{
          labels: dataProcessor(dataChart.data).labels,
          datasets: [
            {
              data: dataProcessor(dataChart.data).values,
              backgroundColor: dataProcessor(dataChart.data).values.map(
                (x: any, index: number) =>
                  "hsl(" +
                  colorHue +
                  "deg, " +
                  colorSat +
                  "%, " +
                  (
                    (100 / (dataProcessor(dataChart.data).values.length + 1)) *
                    (index + 1)
                  ).toString() +
                  "%)"
              ), //spectrum of colours of varying lightness
              borderWidth: 1,
            },
          ],
        }}
        updateMode="default"
        redraw={true}
      />
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
