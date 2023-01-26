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

//State Interface
export interface CurrentWeather {
  status: "loading" | "idle" | "failed";
  weather?: CurrentWeatherType;
}

const initialState: CurrentWeather = {
  status: "idle",
  weather: undefined,
};

//Async Actions
export const FetchCurrentWeather = createAsyncThunk(
  "CurrentWeather/FetchCurrentWeather",
  async (url: string) => {
    const response = await fetchJson(url);
    return response.data;
  }
);

//Actions
export const CurrentWeatherSlice = createSlice({
  name: "CurrentWeather",
  initialState,
  reducers: {
    /*
    //USAGE: dispatch(sampleAction1)
    sampleAction1: (state) => {
      state.value += 1;
    },
    //USAGE: dispatch(sampleAction2(var))
    sampleAction2: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    */
  },
  extraReducers: (builder) => {
    //handle imported actions or Thunk status
    builder
      .addCase(FetchCurrentWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchCurrentWeather.fulfilled, (state, action) => {
        state.status = "idle";
        state.weather = action.payload;
      })
      .addCase(FetchCurrentWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//Selectors
export const CurrentWeatherSelector = (state: RootState) =>
  state.CurrentWeather.weather;
export const CurrentWeatherState = (state: RootState) => state.CurrentWeather;

export default CurrentWeatherSlice.reducer;
