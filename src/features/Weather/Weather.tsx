/******************************************************************

           Name: CurrentWeather
    Description: Displays the current weather, today's overall weather and the next 3 days 
    Return Type: JSX.Element
          Props: lat: number,
                 lon: number,
                 location: string
  Redux Actions: fetchWeather(url: string)
Redux Selectors: weatherManagerState

******************************************************************/

import React, { useEffect } from "react";

//Styles
import styles from "./Weather.module.css";

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

//Components
import { CelsiusTemperature } from "./WeatherTemperature";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDate } from "./WeatherDate";

//Types
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
  )[0]; //get weather data for this location
  const dispatch = useAppDispatch();

  //fether weather on parameter change
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
