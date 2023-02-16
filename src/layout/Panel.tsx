/*****************

Name: Panel
Description: A continer for all components shown in main area
Props: title:string, children: JSX.Element
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./Panel.module.css";

//Type Declarations
type Props = {
  title: string;
  info: string;
  children?: JSX.Element;
  colSpan?: number;
};

export const Panel = ({
  title,
  info,
  children,
  colSpan = 1,
}: Props): JSX.Element => {
  return (
    <section
      className={styles.Panel}
      style={
        { gridColumn: "span " + colSpan.toString() } as React.CSSProperties
      }
    >
      <div className={styles.PanelHeader}>
        <h1 className={styles.PanelTitle}>{title}</h1>
        <span
          className={`${styles.PanelInfo} material-symbols-sharp`}
          title={info}
        >
          info
        </span>
      </div>
      {children}
    </section>
  );
};
