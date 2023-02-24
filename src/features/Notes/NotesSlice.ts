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

//if this is a first run add some sample data into localStorage for notes
if (localStorage.getItem("notes") === null) {
  localStorage.setItem(
    "notes",
    JSON.stringify([
      {
        id: "0234b0e0-73d5-47b7-b95a-8ae17a67614d",
        name: "this is a test",
        type: "text",
        category: "business",
        content: [{ checked: false, value: "this is a test note" }],
      },
      {
        id: "02a6296b-6f78-4693-90ba-521c72c2e3c8",
        name: "second note",
        type: "todo",
        category: "business",
        content: [
          { checked: true, value: "1" },
          { checked: true, value: "5" },
          { checked: true, value: "6" },
          { checked: true, value: "8" },
          { checked: false, value: "9" },
          { checked: true, value: "note 1" },
        ],
      },
    ])
  );
}

//State Interface
const initialState: NotesStateType = {
  notes: JSON.parse(localStorage.getItem("notes") ?? "[]"),
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
            if (index === action.payload.contentIndex) {
              content.value = action.payload.value;
              content.checked = action.payload.checked;
            }
          });
        }
      });
      updateStorage(state);
    },
    AddNoteItem: (
      state: NotesStateType,
      action: PayloadAction<{ id: string }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id)
          note.content.push({ checked: false, value: "" });
      });
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
  localStorage.setItem("notes", JSON.stringify(state.notes));
};

export const {
  CreateNote,
  DeleteNote,
  UpdateNoteName,
  UpdateNoteContent,
  AddNoteItem,
  DeleteNoteContent,
} = NotesSlice.actions;

//Selectors
export const NotesStateSelector = (state: RootState) => state.NotesManager;

export default NotesSlice.reducer;
