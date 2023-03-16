import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  weatherManagerStateType,

  //actions
  fetchWeather,

  //selectors
  weatherManagerState,
} from "./WeatherSlice";

//Styles
import styles from "./Weather.module.css";

//Components
import { CelsiusTemperature } from "./WeatherTemperature";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDate } from "./WeatherDate";

//Type Declarations
type props = {
  lat: number;
  lon: number;
  location: string;
};

export const CurrentWeather: React.FC<props> = ({
  lat,
  lon,
  location,
}: props): JSX.Element => {
  const weatherState: weatherManagerStateType =
    useAppSelector(weatherManagerState);
  const weatherObj = weatherState.locations.filter(
    (item) => item.name === location
  )[0];
  const dispatch = useAppDispatch();

  const exclude = "minutely,alerts";
  useEffect(() => {
    dispatch(fetchWeather({ location, lat, lon, exclude }));
  }, [dispatch, location, lat, lon, exclude]);

  return (
    <div
      className={`${styles.weather} ${
        weatherObj?.status === "idle" || weatherObj?.status === "pending"
          ? "loading"
          : ""
      }`}
    >
      <WeatherIcon
        className={styles.weatherIcon}
        icon={weatherObj?.weather?.current.weather[0].id}
        time={weatherObj?.weather?.current.dt}
        timezone={weatherObj?.weather?.timezone_offset}
      />
      <CelsiusTemperature
        className={styles.temperature}
        temperatureK={weatherObj?.weather?.current?.temp}
      />
      <div className={styles.forecastContainer}>
        {weatherObj?.weather?.daily?.map((w, index: number) => {
          if (index > 3) return null;
          return (
            <div className={styles.forecastDay} key={index}>
              <WeatherDate
                className={styles.forecastDate}
                time={w.dt}
                timezone={weatherObj?.weather?.timezone_offset}
              />
              <WeatherIcon
                className={styles.forecastIcon}
                icon={w.weather[0]?.id}
                time={w.dt}
                timezone={weatherObj?.weather?.timezone_offset}
              />
              <CelsiusTemperature
                className={styles.forecastMaxTemperature}
                temperatureK={w.temp.max}
              />
              <hr />
              <CelsiusTemperature
                className={styles.forecastMinTemperature}
                temperatureK={w.temp.min}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
