import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Declared Types
export type NotesStateType = {
  notes: Array<NoteType>;
};

export type ContentType = {
  id: string;
  checked: boolean;
  value: string;
};

export type NoteType = {
  id: string;
  name: string;
  type: "text" | "todo";
  category: string;
  content: Array<ContentType>;
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
        content: [
          {
            id: "85f29c89-6f94-4cbc-9c30-f268fd22b61a",
            checked: false,
            value: "this is a test note",
          },
        ],
      },
      {
        id: "02a6296b-6f78-4693-90ba-521c72c2e3c8",
        name: "second note",
        type: "todo",
        category: "business",
        content: [
          {
            id: "9e56016d-0479-4ca1-be87-0ad3cf2fccbf",
            checked: true,
            value: "1",
          },
          {
            id: "6317e609-1f5b-4da3-9cd1-8bd5cc101a9d",
            checked: true,
            value: "5",
          },
          {
            id: "120f1582-810c-4502-9035-86d3e99cc801",
            checked: true,
            value: "6",
          },
          {
            id: "15f06755-cb51-4853-afc1-275cdd4a0845",
            checked: true,
            value: "8",
          },
          {
            id: "d80799d1-d299-4db2-b391-1731d9d59704",
            checked: false,
            value: "9",
          },
          {
            id: "a8fc0c5c-46bd-4a57-9426-68c77625457a",
            checked: true,
            value: "note 1",
          },
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
        contentId: string;
        checked: boolean;
        value: string;
      }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id) {
          note.content.forEach((content, index) => {
            if (content.id === action.payload.contentId) {
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
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id)
          note.content.push({
            id: action.payload.contentId,
            checked: false,
            value: "",
          });
      });
    },
    DeleteNoteContent: (
      state: NotesStateType,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id)
          note.content.forEach((content, index) => {
            if (content.id === action.payload.contentId)
              note.content.splice(index, 1);
          });
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
