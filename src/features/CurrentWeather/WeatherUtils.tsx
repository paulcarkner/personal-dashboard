import React from "react";
import Icons from "../../assets/DripIcons-Weather/webfont.module.css";

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

//Icon Component
type IconProps = {
  className: string;
  icon?: number;
  time?: number;
  timezone?: number;
};

//get weather icon
export const WeatherIcon = ({
  className,
  icon,
  time,
  timezone,
}: IconProps): JSX.Element => {
  if (!(icon && time && timezone)) return <span></span>;
  return (
    <span
      className={`${className} ${Icons.diw} ${
        //add DripIcons library class
        Icons[
          "diw-" +
            iconLookup[icon as keyof typeof iconLookup][
              Math.abs(UNIXtoDateTime(time, timezone).getUTCHours() - 14.5) < 7 //convert time to local time then determin if it is day or night
                ? "day"
                : "night"
            ]
        ]
      }`}
    ></span>
  );
};

//convert UNIX time code to DateTime
export function UNIXtoDateTime(unix: number, offset: number): Date {
  return new Date((unix + offset) * 1000);
}

//weather icon look-up table
const iconLookup = {
  200: {
    day: "cloud-drizzle-lightning-sun",
    night: "cloud-drizzle-lightning-moon",
  },
  201: { day: "cloud-drizzle-lightning", night: "cloud-drizzle-lightning" },
  202: { day: "cloud-drizzle-lightning", night: "cloud-drizzle-lightning" },
  210: { day: "cloud-lightning-sun", night: "cloud-lightning-moon" },
  211: { day: "cloud-lightning", night: "cloud-lightning" },
  212: { day: "cloud-lightning", night: "cloud-lightning" },
  221: { day: "cloud-lightning", night: "cloud-lightning" },
  230: {
    day: "cloud-drizzle-lightning-sun",
    night: "cloud-drizzle-lightning-moon",
  },
  231: {
    day: "cloud-drizzle-lightning-sun",
    night: "cloud-drizzle-lightning-moon",
  },
  232: { day: "cloud-drizzle-lightning", night: "cloud-drizzle-lightning" },
  300: { day: "cloud-drizzle-sun", night: "cloud-drizzle-moon" },
  301: { day: "cloud-drizzle-sun", night: "cloud-drizzle-moon" },
  302: { day: "cloud-drizzle", night: "cloud-drizzle" },
  310: { day: "cloud-drizzle-sun", night: "cloud-drizzle-moon" },
  311: { day: "cloud-drizzle", night: "cloud-drizzle" },
  312: { day: "cloud-drizzle", night: "cloud-drizzle" },
  313: { day: "cloud-drizzle-sun", night: "cloud-drizzle-moon" },
  314: { day: "cloud-drizzle", night: "cloud-drizzle" },
  321: { day: "cloud-drizzle-sun", night: "cloud-drizzle-moon" },
  500: { day: "cloud-rain-sun", night: "cloud-rain-moon" },
  501: { day: "cloud-rain-sun", night: "cloud-rain-moon" },
  502: { day: "cloud-rain", night: "cloud-rain" },
  503: { day: "cloud-rain", night: "cloud-rain" },
  504: { day: "cloud-rain", night: "cloud-rain" },
  511: { day: "cloud-hail", night: "cloud-hail" },
  520: { day: "cloud-rain-sun", night: "cloud-rain-moon" },
  521: { day: "cloud-rain", night: "cloud-rain" },
  522: { day: "cloud-rain", night: "cloud-rain" },
  531: { day: "cloud-rain", night: "cloud-rain" },
  600: { day: "cloud-snow-sun", night: "cloud-snow-moon" },
  601: { day: "cloud-snow-sun", night: "cloud-snow-moon" },
  602: { day: "cloud-snow", night: "cloud-snow" },
  611: { day: "cloud-hail", night: "cloud-hail" },
  612: { day: "cloud-hail-light-sun", night: "cloud-hail-light-moon" },
  613: { day: "cloud-hail-light-sun", night: "cloud-hail=light-moon" },
  615: { day: "cloud-snow-sun", night: "cloud-snow-moon" },
  616: { day: "cloud-snow-sun", night: "cloud-snow-moon" },
  620: { day: "cloud-snow-sun", night: "cloud-snow-moon" },
  621: { day: "cloud-snow", night: "cloud-snow" },
  622: { day: "cloud-snow", night: "cloud-snow" },
  701: { day: "cloud-fog-2", night: "cloud-fog-2" },
  711: { day: "cloud-fog-2", night: "cloud-fog-2" },
  721: { day: "cloud-fog-sun", night: "cloud-fog-moon" },
  731: { day: "cloud-fog-2", night: "cloud-fog-2" },
  741: { day: "cloud-fog-sun", night: "cloud-fog-moon" },
  751: { day: "cloud-fog-2", night: "cloud-fog-2" },
  761: { day: "cloud-fog-2", night: "cloud-fog-2" },
  762: { day: "cloud-fog-2", night: "cloud-fog-2" },
  771: { day: "cloud-wind-sun", night: "cloud-wind-moon" },
  781: { day: "tornado", night: "tornado" },
  800: { day: "sun", night: "moon-stars" },
  801: { day: "cloud-sun", night: "cloud-moon" },
  802: { day: "cloud-sun-2", night: "cloud-moon" },
  803: { day: "cloud-sun-2", night: "cloud-moon" },
  804: { day: "clouds-sun-2", night: "clouds-moon" },
};

//Date Component
type WeatherDateProps = {
  className: string;
  time?: number;
  timezone?: number;
};

export const WeatherDate = ({
  className,
  time,
  timezone,
}: WeatherDateProps): JSX.Element => {
  if (!(time && timezone)) return <div></div>;
  const d: Date = UNIXtoDateTime(time, timezone);
  const DoW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  return <div className={className}>{isToday ? "Today" : DoW[d.getDay()]}</div>;
};
