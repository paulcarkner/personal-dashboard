import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

//Reducers
import sampleReducer from "../features/_sample/_sampleSlice"; //SAMPLE
import RssFeedReducer from "../features/RssFeed/RssFeedSlice";
import WeatherManagerReducer from "../features/Weather/WeatherSlice";
import NotesReducer from "../features/Notes/NotesSlice";
import DataChartReducer from "../features/DataChart/DataChartSlice";

export const store = configureStore({
  reducer: {
    sample: sampleReducer, //SAMPLE
    RssFeed: RssFeedReducer,
    WeatherManager: WeatherManagerReducer,
    NotesManager: NotesReducer,
    DataChartManager: DataChartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
