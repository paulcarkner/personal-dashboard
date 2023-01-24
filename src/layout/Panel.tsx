/*****************

Name: Panel
Description: A continer for all components shown in main area
Props: title:string, children: JSX.Element
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./Panel.module.css";

type Props = {
  title: string;
  children?: JSX.Element;
};

export const Panel = ({ title, children }: Props): JSX.Element => {
  return (
    <section className={styles.Panel}>
      <h1>title</h1>
      {children}
    </section>
  );
};
