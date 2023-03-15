import React from "react";

//Temperature Component
type TemperatureProps = {
  className: string;
  temperatureC?: number;
  temperatureK?: number;
};

export const CelsiusTemperature = ({
  className,
  temperatureK,
  temperatureC,
}: TemperatureProps): JSX.Element => {
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