/*****************

Name: CurrentWeather
Description: Panel contents for current weather
Props: title:string, children: JSX.Element
Output: JSX.Element

*****************/

import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  CurrentWeatherType,
  CurrentWeatherStateType,
  WeatherLocationType,
  //actions
  FetchCurrentWeather,
  //selectors
  CurrentWeatherStateSelector,
} from "./CurrentWeatherSlice";

//Styles
import styles from "./CurrentWeather.module.css";

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
  // const weatherTemp: Array<CurrentWeatherType> | undefined = useAppSelector(
  //   CurrentWeatherSelector
  // ); //.filter((item: CurrentWeatherType) => item.location === location)[0];
  // let weather = weatherTemp ? weatherTemp[0] : null;
  const weatherState: CurrentWeatherStateType | undefined = useAppSelector(
    CurrentWeatherStateSelector
  ); //.filter((item: CurrentWeatherType) => item.location === location)[0];
  const weather: CurrentWeatherType | underfined =
    weatherState.locations.filter(
      (item: WeatherLocationType) => item.location === location
    )[0].weather;
  const dispatch = useAppDispatch();

  //const lat = 43.6534817; //Toronto, ON
  //const lon = -79.3839347;
  const exclude = "minutely,alerts";
  useEffect(() => {
    dispatch(FetchCurrentWeather({ location, lat, lon, exclude }));
  }, []);
  return (
    <section
      className={`${styles.CurrentWeather} ${
        ""
        // weatherState?.status === "loading" ? "loading" : ""
      }`}
    >
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
    </section>
  );
};
