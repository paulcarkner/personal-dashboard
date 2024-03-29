/******************************************************************

           Name: CelsiusTemperature
    Description: Returns a temperature in Celsius for display
    Return Type: JSX.Element
          Props: className: string,
                 temperatureC?: number,
                 temperatureK?: number
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Types
type temperatureProps = {
  className: string;
  temperatureC?: number;
  temperatureK?: number;
};

export const CelsiusTemperature = ({
  className,
  temperatureK,
  temperatureC,
}: temperatureProps): JSX.Element => {
  if (temperatureK)
    return (
      <span className={className}>
        {(temperatureK - 273.15).toFixed(0)}
        <sup>°C</sup>
      </span>
    );
  if (temperatureC)
    return (
      <span className={className}>
        {temperatureC.toFixed(0)}
        <sup>°C</sup>
      </span>
    );
  return <span className={className}></span>;
};
