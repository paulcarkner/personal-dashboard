import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchJson } from "../../app/utils";

//Declared Types
export type LocationType = {
  name: string;
  status: JsonStatusType;
  weather?: WeatherType;
};

export type JsonStatusType = "idle" | "pending" | "fulfilled" | "failed";

export type WeatherType = {
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
export interface WeatherManagerStateType {
  locations: Array<LocationType>;
}

const initialState: WeatherManagerStateType = {
  locations: [],
};

const apiKey = "f4bcb6a805ca765f7df85383dc7fdbab"; //for demonstration only, key is domain-restricted

//Actions
export const FetchWeather = createAsyncThunk(
  "WeatherManager/FetchWeather",
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

//Actions
export const WeatherManagerSlice = createSlice({
  name: "WeatherManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //handle imported actions or Thunk status
    builder
      .addCase(FetchWeather.pending, (state, action) => {
        let location: string = action.meta.arg.location;
        addLocationIfMissing(location, state);
        setLocationStatus(location, state, "pending");
      })
      .addCase(FetchWeather.fulfilled, (state, action) => {
        let location: string = action.meta.arg.location;
        setLocationWeather(location, state, action.payload);
        setLocationStatus(location, state, "fulfilled");
      })
      .addCase(FetchWeather.rejected, (state, action) => {
        let location: string = action.meta.arg.location;
        setLocationStatus(location, state, "failed");
      });
  },
});

const addLocationIfMissing = (
  location: string,
  state: WeatherManagerStateType
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
  state: WeatherManagerStateType,
  status: JsonStatusType
) => {
  state.locations
    .filter((item) => item.name === location)
    .forEach((item) => (item.status = status));
};

const setLocationWeather = (
  location: string,
  state: WeatherManagerStateType,
  weather: WeatherType
) => {
  state.locations
    .filter((item) => item.name === location)
    .forEach((item) => (item.weather = weather));
};

//Selectors
export const WeatherManagerState = (state: RootState) => state.WeatherManager;

export default WeatherManagerSlice.reducer;
