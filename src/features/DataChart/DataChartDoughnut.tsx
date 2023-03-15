import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";

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

//Type Declarations
type Props = {
  url: string;
  dataProcessor: Function;
};

ChartJS.register(ArcElement, Tooltip, Legend);

function getCssValue(param: string) {
  const AppEl = document.getElementById("App");
  return getComputedStyle(
    AppEl || document.createElement("div")
  ).getPropertyValue(param);
}

export const DoughnutChart = ({ url, dataProcessor }: Props): JSX.Element => {
  const dataChartState: DataChartStateType = useAppSelector(
    DataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();
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
  );

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(FetchDataSource({ url }));
  });

  return dataChart?.data !== undefined ? (
    <div
      className={`${styles.ChartContainer} ${
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
              ),
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
