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
        id: "f6c71500-4b3b-4190-bf61-c790c486aef1",
        name: "hello world",
        type: "text",
        category: "business",
        content: [{ checked: false, value: "" }],
      },
      {
        id: "1e0bcefb-0b4f-40ab-9b7d-798ba4f72fd3",
        name: "another note",
        type: "text",
        category: "business",
        content: [{ checked: false, value: "here is a bunch of content" }],
      },
      {
        id: "cdf3259d-3186-432c-80a5-4e2efcf4a1fd",
        name: "alaksdgjf;lasjdfl;aksjdfl;asdjflasdjf;ljadsf;lkjasdf;lkjdsfl;kjdsafl;kjadsf",
        type: "text",
        category: "business",
        content: [{ checked: false, value: "" }],
      },
      {
        id: "a26eafd7-cb60-4ff5-a369-b0042c1a128f",
        name: "more notes",
        type: "text",
        category: "business",
        content: [
          {
            checked: false,
            value:
              "line 1\nline 2\nline 3\nline 4\nline 5\nline 6\nline 7\nline 8",
          },
        ],
      },
      {
        id: "dd42d817-891c-4d21-a009-d6ce53727320",
        name: "somthing new",
        type: "text",
        category: "personal",
        content: [{ checked: false, value: "with content" }],
      },
      {
        id: "8353bd2c-25be-48fa-af2d-ce8fc9b586ca",
        name: "To Fix",
        type: "todo",
        category: "website",
        content: [
          {
            id: "ae3e1144-0b82-440f-81c0-807d1a7d3253",
            checked: false,
            value: 'Update "about me" page',
          },
          {
            id: "e9229ea5-0f7e-4a08-b231-d8e0b9272e67",
            checked: false,
            value: "Colour scheme in footer",
          },
          {
            id: "9abb2af0-322b-4459-a4d3-18c8e0684712",
            checked: false,
            value: "Menu spacing on mobile",
          },
          {
            id: "93693c00-34bb-4d3e-9397-fb8a8e51dc58",
            checked: false,
            value: "Favicon",
          },
          {
            id: "c9d5375b-2f16-46b7-bd21-409c53992ae6",
            checked: false,
            value: "Meta tags links",
          },
          {
            id: "a8c2ebc9-cda0-4a4d-858f-801317b1f42c",
            checked: false,
            value: "CDN caching parameters",
          },
          {
            id: "70c7bf9a-3773-45b9-8f93-56c2fa6d1d85",
            checked: false,
            value: "Font loading",
          },
        ],
      },
      {
        id: "da2a7971-6758-4376-ac28-a70bd6b11438",
        name: "New Features",
        type: "todo",
        category: "website",
        content: [
          {
            id: "dda4014b-c1f1-4dfc-a9bb-6ed4cc3bc6fb",
            checked: false,
            value: "Two-factor Authentication",
          },
          {
            id: "0b9ae1ad-7585-4def-bf3a-95b3ed30a5f2",
            checked: false,
            value: "Theme customization",
          },
          {
            id: "c3a1f507-3d5e-4b38-8de4-029110908d18",
            checked: false,
            value: "Page sharing",
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
