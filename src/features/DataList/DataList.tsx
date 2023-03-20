/******************************************************************

           Name: DataList
    Description: A list of specified components filled with given data
    Return Type: JSX.Element
          Props: url: string,
                 dataProcessor(data) => Array<any>
                 template: React.FC<any>
  Redux Actions: fetchDataSource(url: string)
Redux Selectors: dataChartSelector

******************************************************************/

import React, { useEffect } from "react";

//Styles
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

//Types
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
  )[0]; //get data for passed url
  const dispatch = useAppDispatch();

  //fetchData if doesn't exist
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
          //create template component and pass props
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
