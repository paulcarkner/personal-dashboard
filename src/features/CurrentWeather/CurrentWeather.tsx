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

//Type Declarations

export const CurrentWeather: React.FC = (): JSX.Element => {
  const weather: CurrentWeatherType | undefined = useAppSelector(
    CurrentWeatherSelector
  );
  const dispatch = useAppDispatch();

  const lat = 43.6534817;
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
    <section className={styles.CurrentWeather}>{weather?.current.temp}</section>
  );
};
