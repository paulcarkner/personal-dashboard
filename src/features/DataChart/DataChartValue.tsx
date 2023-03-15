import React, { useEffect } from "react";

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

export const DisplayValue = ({ url, dataProcessor }: Props): JSX.Element => {
  const dataChartState: DataChartStateType = useAppSelector(
    DataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(FetchDataSource({ url }));
  });

  return dataChart?.data !== undefined ? (
    <div
      className={`${styles.ValueContainer} ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      <div className={styles.Value}>
        {dataProcessor(dataChart.data).prepend}
        {dataProcessor(dataChart.data).value}
        {dataProcessor(dataChart.data).append}
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
