/*****************

Name: Panel
Description: A continer for all components shown in main area
Props: title:string, children: JSX.Element
Output: JSX.Element

*****************/

import React from "react";
import ErrorBoundary from "./ErrorBoundary";

//Styles
import styles from "./Panel.module.css";

//Types
type props = {
  title: string;
  info: string;
  children?: JSX.Element;
  colSpan?: number;
  rowSpan?: number;
};

export const Panel = ({
  title,
  info,
  children,
  colSpan = 1,
  rowSpan = 1,
}: props): JSX.Element => {
  return (
    <section
      className={styles.panel}
      style={
        {
          gridColumn: colSpan !== 1 ? "span " + colSpan.toString() : null,
          gridRow: rowSpan !== 1 ? "span " + rowSpan.toString() : null,
        } as React.CSSProperties
      }
    >
      <div className={styles.panelHeader}>
        <h1 className={styles.panelTitle}>{title}</h1>
        <span
          className={`${styles.panelInfo} material-symbols-sharp`}
          title={info}
        >
          info
        </span>
      </div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
  );
};
