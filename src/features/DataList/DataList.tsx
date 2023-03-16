import React, { useEffect } from "react";
import styles from "./DataList.module.css";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  //types
  dataChartStateType,

  //actions
  fetchDataSource,

  //selectors
  dataChartStateSelector,
} from "./../DataChart/DataChartSlice";

//Type Declarations
type props = {
  url: string;
  dataProcessor: Function;
  template: React.FC<any>;
};

export const DataList: React.FC<props> = ({
  url,
  dataProcessor,
  template,
}: props): JSX.Element => {
  const dataChartState: dataChartStateType = useAppSelector(
    dataChartStateSelector
  );
  const dataChart = dataChartState.dataSources?.filter(
    (source) => source.url === url
  )[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataChart?.url !== url) dispatch(fetchDataSource({ url }));
  });

  return (
    <div
      className={`${styles.listContainer} customScroll ${
        dataChart?.status === "idle" || dataChart?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      {dataChart?.data ? (
        dataProcessor(dataChart.data).map((props: Object, key: number) => {
          return React.createElement(template, {
            ...props,
            key: key,
          });
        })
      ) : (
        <></>
      )}
    </div>
  );
};
