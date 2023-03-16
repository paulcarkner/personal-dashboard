import React from "react";
import { unixToDateTime } from "./WeatherUtils";

//Date Component
type weatherDateProps = {
  className: string;
  time?: number;
  timezone?: number;
};

export const WeatherDate = ({
  className,
  time,
  timezone,
}: weatherDateProps): JSX.Element => {
  if (!(time && timezone)) return <div></div>;
  const d: Date = unixToDateTime(time, timezone);
  const DoW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  return <div className={className}>{isToday ? "Today" : DoW[d.getDay()]}</div>;
};
