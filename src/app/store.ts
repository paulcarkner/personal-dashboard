import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

//Reducers
import darkModeReducer from "../features/DarkMode/DarkModeSlice";
import rssFeedReducer from "../features/RssFeed/RssFeedSlice";
import weatherManagerReducer from "../features/Weather/WeatherSlice";
import notesReducer from "../features/Notes/NotesSlice";
import dataChartReducer from "../features/DataChart/DataChartSlice";

export const store = configureStore({
  reducer: {
    darkModeManager: darkModeReducer,
    rssFeed: rssFeedReducer,
    weatherManager: weatherManagerReducer,
    notesManager: notesReducer,
    dataChartManager: dataChartReducer,
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
