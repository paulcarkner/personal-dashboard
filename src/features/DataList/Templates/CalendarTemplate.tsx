import React from "react";
import styles from "./CalendarTemplate.module.css";

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
  const st = new Date(startTime);
  const et = new Date(st.getTime() + duration * 60 * 1000);
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
