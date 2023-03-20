/******************************************************************

           Name: CalendarTemplate
    Description: A list of agenda items with date inserted before the first item each day
    Return Type: JSX.Element
          Props: isFirst: string,
                 name: string,
                 location: string,
                 startTime: date,
                 duration: number
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./CalendarTemplate.module.css";

//Types
export type props = {
  isFirst?: boolean;
  name: string;
  location?: string;
  startTime: Date;
  duration: number;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const CalendarTemplate = ({
  isFirst,
  name,
  location,
  startTime,
  duration,
}: props): JSX.Element => {
  const st = new Date(startTime); //start time
  const et = new Date(st.getTime() + duration * 60 * 1000); //end time
  return (
    <div
      className={`${styles.container} ${isFirst ? styles.isFirst : null}`}
      data-date={isFirst ? `${st.getDate()} ${days[st.getDay()]}` : null}
    >
      <div className={styles.item}>
        <div className={styles.times}>
          {st.getHours()}:{("0" + st.getMinutes().toString()).slice(-2)}-
          {et.getHours()}:{("0" + et.getMinutes().toString()).slice(-2)}
        </div>
        <div>
          {name}{" "}
          {location ? (
            <div className={styles.location}>({location})</div>
          ) : null}{" "}
        </div>
      </div>
    </div>
  );
};
