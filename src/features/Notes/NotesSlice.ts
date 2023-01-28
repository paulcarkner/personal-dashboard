import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

//Declared Types
export type NotesType = {
  notes: Array<Note>;
};

export type Note = {
  id: string;
  name: string;
  type: "text" | "todo";
  content: Array<string>;
};

//State Interface
const initialState: NotesType = {
  notes: JSON.parse(localStorage.getItem("notes") + ""),
};

//Actions
export const NotesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      updateStorage(state);
    },
  },
});

const updateStorage = (state: NotesType) => {
  localStorage.setItem("notes", JSON.stringify(state));
};

//Selectors
