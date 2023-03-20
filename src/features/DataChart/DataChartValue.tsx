/******************************************************************

           Name: DisplayValue
    Description: A text panel displaying the given data
    Return Type: JSX.Element
          Props: url: string
                 dataProcessor(data) => {prepend: string, value: string, append: string, subValue: string}
  Redux Actions: fetchDataSource(url: string)
Redux Selectors: dataChartSelector

******************************************************************/

import React, { useEffect } from "react";

//Styles
import styles from "./DataChart.module.css";

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

export const DisplayValue = ({ url, dataProcessor }: props): JSX.Element => {
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

  return dataChart?.data !== undefined ? (
    <div
      className={`${styles.valueContainer} ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      <div className={styles.value}>
        {dataProcessor(dataChart.data).prepend}
        {dataProcessor(dataChart.data).value}
        {dataProcessor(dataChart.data).append}
      </div>
      <div className={styles.subValue}>
        {dataProcessor(dataChart.data).subValue}
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
