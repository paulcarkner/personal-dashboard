import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

//State Interface
export interface DarkModeStateType {
  isDark: boolean;
}

const initialState: DarkModeStateType = {
  isDark: true,
};

//Actions
export const DarkModeSlice = createSlice({
  name: "DarkModeManager",
  initialState,
  reducers: {
    toggleDarkMode: (state: DarkModeStateType) => {
      state.isDark = !state.isDark;
    },
  },
});

//export actions
export const { toggleDarkMode } = DarkModeSlice.actions;

//Selectors
export const isDarkSelector = (state: RootState) =>
  state.DarkModeManager.isDark;

export default DarkModeSlice.reducer;
