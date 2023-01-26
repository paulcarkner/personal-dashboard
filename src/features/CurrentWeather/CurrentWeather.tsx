/*****************

Name: CurrentWeather
Description: Panel contents for current weather
Props: title:string, children: JSX.Element
Output: JSX.Element

*****************/

import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CurrentWeatherType } from "./CurrentWeatherSlice"; //type import
import {
  FetchCurrentWeather,
  CurrentWeatherSelector,
} from "./CurrentWeatherSlice"; //action/selector import

//Styles
import styles from "./CurrentWeather.module.css";

//Components
import { CelsiusTemperature, WeatherIcon, WeatherDate } from "./WeatherUtils";

//Type Declarations

export const CurrentWeather: React.FC = (): JSX.Element => {
  const weather: CurrentWeatherType | undefined = useAppSelector(
    CurrentWeatherSelector
  );
  const dispatch = useAppDispatch();

  const lat = 43.6534817; //Toronto, ON
  const lon = -79.3839347;
  const exclude = "minutely,alerts";
  const apiKey = "f4bcb6a805ca765f7df85383dc7fdbab"; //for demonstration only, key is domain-restricted
  useEffect(() => {
    dispatch(
      FetchCurrentWeather(
        `https://api.openweathermap.org/data/3.0/onecall?exclude=${exclude}&lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
    );
  }, []);
  return (
    <section className={styles.CurrentWeather}>
      <WeatherIcon
        className={styles.WeatherIcon}
        icon={weather?.current?.weather[0]?.id}
        time={weather?.current?.dt}
        timezone={weather?.timezone_offset}
      />
      <CelsiusTemperature
        className={styles.Temperature}
        temperatureK={weather?.current?.temp}
      />
      <div className={styles.ForecastContainer}>
        {weather?.daily?.map((w, index) => {
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
              <CelsiusTemperature
                className={styles.ForecastMinTemperature}
                temperatureK={w.temp.min}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
