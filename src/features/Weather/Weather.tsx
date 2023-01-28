import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  WeatherManagerStateType,

  //actions
  FetchWeather,

  //selectors
  WeatherManagerState,
} from "./WeatherSlice";

//Styles
import styles from "./Weather.module.css";

//Components
import { CelsiusTemperature, WeatherIcon, WeatherDate } from "./WeatherUtils";

//Type Declarations
type Props = {
  lat: number;
  lon: number;
  location: string;
};

export const CurrentWeather: React.FC<Props> = ({
  lat,
  lon,
  location,
}: Props): JSX.Element => {
  const weatherState: WeatherManagerStateType =
    useAppSelector(WeatherManagerState);
  const weather = weatherState.locations.filter(
    (item) => item.name === location
  )[0]?.weather;
  const dispatch = useAppDispatch();

  const exclude = "minutely,alerts";
  useEffect(() => {
    dispatch(FetchWeather({ location, lat, lon, exclude }));
  }, []);

  return (
    <div
      className={`${styles.Weather} ${
        ""
        // weatherState?.status === "loading" ? "loading" : ""
      }`}
    >
      <WeatherIcon
        className={styles.WeatherIcon}
        icon={weather?.current.weather[0].id}
        time={weather?.current.dt}
        timezone={weather?.timezone_offset}
      />
      <CelsiusTemperature
        className={styles.Temperature}
        temperatureK={weather?.current?.temp}
      />
      <div className={styles.ForecastContainer}>
        {weather?.daily?.map((w, index: number) => {
          if (index > 3) return null;
          return (
            <div className={styles.ForecastDay} key={index}>
              <WeatherDate
                className={styles.ForecastDate}
                time={w.dt}
                timezone={weather?.timezone_offset}
              />
              <WeatherIcon
                className={styles.ForecastIcon}
                icon={w.weather[0]?.id}
                time={w.dt}
                timezone={weather?.timezone_offset}
              />
              <CelsiusTemperature
                className={styles.ForecastMaxTemperature}
                temperatureK={w.temp.max}
              />
              <hr />
              <CelsiusTemperature
                className={styles.ForecastMinTemperature}
                temperatureK={w.temp.min}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
