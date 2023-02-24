import React, { useEffect } from "react";
import styles from "./DataList.module.css";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  //types
  DataChartStateType,

  //actions
  FetchDataSource,

  //selectors
  DataChartStateSelector,
} from "./../DataChart/DataChartSlice";

//Type Declarations
type Props = {
  url: string;
  dataProcessor: Function;
  template: React.FC<any>;
};

export const DataList: React.FC<Props> = ({
  url,
  dataProcessor,
  template,
}: Props): JSX.Element => {
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

  return (
    <div className={`${styles.ListContainer} customScroll`}>
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
