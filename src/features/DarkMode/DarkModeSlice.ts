import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//State Interface
export interface darkModeStateType {
  isDark: boolean;
}

const initialState: darkModeStateType = {
  isDark: true,
};

//Actions
export const darkModeSlice = createSlice({
  name: "darkModeManager",
  initialState,
  reducers: {
    toggleDarkMode: (state: darkModeStateType) => {
      state.isDark = !state.isDark;
    },
  },
});

//export actions
export const { toggleDarkMode } = darkModeSlice.actions;

//Selectors
export const isDarkSelector = (state: RootState) =>
  state.darkModeManager.isDark;

export default darkModeSlice.reducer;
