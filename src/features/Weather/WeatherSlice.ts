import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchJson } from "../../app/utils";

//Declared Types
export type locationType = {
  name: string;
  status: jsonStatusType;
  weather?: weatherType;
};

export type jsonStatusType = "idle" | "pending" | "fulfilled" | "failed";

export type weatherType = {
  timezone_offset: number;
  current: {
    dt: number;
    temp: number;
    weather: Array<{
      id: number;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      id: number;
    }>;
  }>;
};

//State Interface
export interface weatherManagerStateType {
  locations: Array<locationType>;
}

const initialState: weatherManagerStateType = {
  locations: [],
};

const apiKey = "f4bcb6a805ca765f7df85383dc7fdbab"; //for demonstration only, key is domain-restricted

//Actions
export const fetchWeather = createAsyncThunk(
  "weatherManager/fetchWeather",
  async (props: {
    location: string;
    lat: number;
    lon: number;
    exclude: string;
  }) => {
    const response = await fetchJson(
      `https://api.openweathermap.org/data/3.0/onecall?exclude=${props.exclude}&lat=${props.lat}&lon=${props.lon}&appid=${apiKey}`
    );
    return response.data;
  }
);

export const weatherManagerSlice = createSlice({
  name: "weatherManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        let location: string = action.meta.arg.location;
        addLocationIfMissing(location, state);
        setLocationStatus(location, state, "pending");
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        let location: string = action.meta.arg.location;
        setLocationWeather(location, state, action.payload);
        setLocationStatus(location, state, "fulfilled");
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        let location: string = action.meta.arg.location;
        setLocationStatus(location, state, "failed");
      });
  },
});

const addLocationIfMissing = (
  location: string,
  state: weatherManagerStateType
) => {
  if (!state.locations.some((item) => item.name === location))
    state.locations.push({
      name: location,
      status: "idle",
      weather: undefined,
    });
};

const setLocationStatus = (
  location: string,
  state: weatherManagerStateType,
  status: jsonStatusType
) => {
  state.locations
    .filter((item) => item.name === location)
    .forEach((item) => (item.status = status));
};

const setLocationWeather = (
  location: string,
  state: weatherManagerStateType,
  weather: weatherType
) => {
  state.locations
    .filter((item) => item.name === location)
    .forEach((item) => (item.weather = weather));
};

//Selectors
export const weatherManagerState = (state: RootState) => state.weatherManager;

export default weatherManagerSlice.reducer;
