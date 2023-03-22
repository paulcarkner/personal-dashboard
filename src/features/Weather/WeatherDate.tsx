/******************************************************************

           Name: WeatherDate
    Description: Returns human-readable date
    Return Type: JSX.Element
          Props: className: string,
                 time?: number (UNIX date format),
                 timezone?: number
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Utilities
import { unixToDateTime } from "./WeatherUtils";

//Types
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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  return (
    <div className={className}>{isToday ? "Today" : dayNames[d.getDay()]}</div>
  );
};
