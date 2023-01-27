import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchJson } from "../../app/utils";

//Declared Types
export type CurrentWeatherType = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
    rain: any;
  }>;
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: { day: number; night: number; eve: number; morn: number };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: number;
    pop: number;
    rain: number;
    snow: number;
    uvi: number;
  }>;
};

type FetchPropsType = {
  location: string;
  lat: number;
  lon: number;
  exclude: string;
};

export type WeatherLocationType = {
  location: string;
  status: "loading" | "idle" | "failed";
  weather?: CurrentWeatherType;
};

//State Interface
export interface CurrentWeatherStateType {
  locations: Array<WeatherLocationType>;
}

const initialState: CurrentWeatherStateType = {
  locations: [],
};

const apiKey = "f4bcb6a805ca765f7df85383dc7fdbab"; //for demonstration only, key is domain-restricted

//Async Actions
export const FetchCurrentWeather = createAsyncThunk(
  "CurrentWeather/FetchCurrentWeather",
  async (props: FetchPropsType) => {
    const response = await fetchJson(
      `https://api.openweathermap.org/data/3.0/onecall?exclude=${props.exclude}&lat=${props.lat}&lon=${props.lon}&appid=${apiKey}`
    );
    return { location: props.location, data: response.data };
  }
);

//Actions
export const CurrentWeatherSlice = createSlice({
  name: "CurrentWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //handle imported actions or Thunk status
    builder
      .addCase(FetchCurrentWeather.pending, (state, action) => {
        console.log(action);
        // if (
        //   !state.locations?.some(
        //     (item: WeatherLocationType) =>
        //       item.location === action.payload.location
        //   )
        // ) {
        //   state.locations.push(new WeatherLocationType() {location: location});
        // }
        //state.status = "loading";
      })
      .addCase(FetchCurrentWeather.fulfilled, (state, action) => {
        console.log(action);
        //state.status = "idle";
        //   const w = Object.assign(action.payload.data, {
        //     location: action.payload.location,
        //   });
        //   if (
        //     !state.locations?.some(
        //       (item: WeatherLocationType) =>
        //         item.location === action.payload.location
        //     )
        //   ) {
        //     state.locations.push(new WeatherLocationType() {location: location});
        //   }
        //     state.locations.filter((item: WeatherLocationType) =>
        //     item.location === action.payload.location
        // )[0].weather = w;
      })
      .addCase(FetchCurrentWeather.rejected, (state, action) => {
        console.log(action);
        // if (
        //   !state.locations?.some(
        //     (item: WeatherLocationType) =>
        //       item.location === action.payload.location
        //   )
        // ) {
        //   state.locations.push(({location: action.payload.location, status: "failed"}) as WeatherLocationType);
        // }
        // state.locations[0].status = "failed";
      });
  },
});

//Selectors
// export const CurrentWeatherSelector = (state: RootState) =>
//   state.CurrentWeather.locations;
export const CurrentWeatherStateSelector = (state: RootState) =>
  state.CurrentWeather;

export default CurrentWeatherSlice.reducer;
