import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

//Declared Types
export type NotesStateType = {
  notes: Array<NoteType>;
};

export type NoteType = {
  id: string;
  name: string;
  type: "text" | "todo";
  category: string;
  content: Array<{ checked: boolean; value: string }>;
};

//State Interface
const initialState: NotesStateType = {
  notes: JSON.parse(localStorage.getItem("notes") + ""),
};

//Actions
export const NotesSlice = createSlice({
  name: "NotesManager",
  initialState,
  reducers: {
    CreateNote: (state: NotesStateType, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload);
      updateStorage(state);
    },
    DeleteNote: (state: NotesStateType, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((item) => item.id !== action.payload);
      updateStorage(state);
    },
    UpdateNoteName: (
      state: NotesStateType,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id) note.name = action.payload.name;
      });
      updateStorage(state);
    },
    UpdateNoteContent: (
      state: NotesStateType,
      action: PayloadAction<{
        id: string;
        contentIndex: number;
        checked: boolean;
        value: string;
      }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id) {
          note.content.forEach((content, index) => {
            if (index === action.payload.contentIndex)
              content.value = action.payload.value;
            content.checked = action.payload.checked;
          });
        }
      });
      updateStorage(state);
    },
    DeleteNoteContent: (
      state: NotesStateType,
      action: PayloadAction<{ id: string; contentIndex: number }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id)
          note.content.splice(action.payload.contentIndex, 1);
      });
      updateStorage(state);
    },
  },
});

const updateStorage = (state: NotesStateType) => {
  localStorage.setItem("notes", JSON.stringify(state));
};

export const {
  CreateNote,
  DeleteNote,
  UpdateNoteName,
  UpdateNoteContent,
  DeleteNoteContent,
} = NotesSlice.actions;

//Selectors
export const NotesStateSelector = (state: RootState) => state.NotesManager;

export default NotesSlice.reducer;
