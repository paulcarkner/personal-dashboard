import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Declared Types
export type notesStateType = {
  notes: Array<noteType>;
};

export type contentType = {
  id: string;
  checked: boolean;
  value: string;
};

export type noteType = {
  id: string;
  name: string;
  type: "text" | "todo";
  category: string;
  content: Array<contentType>;
};

//if this is a first run add some sample data into localStorage for notes
if (localStorage.getItem("notes") === null) {
  localStorage.setItem(
    "notes",
    JSON.stringify([
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
      {
        id: "d61849c1-f016-43c6-852a-5de9cefaccc2",
        name: "To Buy",
        type: "todo",
        category: "vacation",
        content: [
          {
            id: "1dee5d2c-6281-4c25-8b1e-da735de0af31",
            checked: false,
            value: "Sunscreen",
          },
          {
            id: "7537cf68-01ad-47fe-8cbb-01a1a835c13d",
            checked: false,
            value: "Sandals",
          },
          {
            id: "5c25ca99-1ea2-459b-a638-7a952accd85c",
            checked: true,
            value: "Bathing Suit",
          },
        ],
      },
      {
        id: "152d9c52-fd35-411d-bf3c-a4fbabb42442",
        name: "Packing List",
        type: "todo",
        category: "vacation",
        content: [
          {
            id: "da8f77d7-20d0-4e4d-b3fd-3eb12a0f86ed",
            checked: false,
            value: "Passports",
          },
          {
            id: "cde0b041-ac26-40b5-83c6-4a83b1feabb4",
            checked: false,
            value: "Tickets",
          },
          {
            id: "49623c91-a291-4edd-8000-bc4320f75916",
            checked: false,
            value: "Chargers",
          },
          {
            id: "e32c8f00-bcf6-499a-8ceb-b49622e51c2d",
            checked: false,
            value: "Camera/Memory Cards",
          },
          {
            id: "e2e30543-8210-429e-abbc-ea6031c3a53e",
            checked: false,
            value: "Laptop/Tablet",
          },
          {
            id: "0c3885c3-8e43-46e4-a551-902066fe063f",
            checked: false,
            value: "Books",
          },
          {
            id: "9fdd2491-c58b-4c34-a3a2-29293f0d1185",
            checked: false,
            value: "Airplane Pillow",
          },
        ],
      },
      {
        id: "61b57379-870c-4fdd-bddd-406041b66967",
        name: "Activity Ideas",
        type: "text",
        category: "vacation",
        content: [
          {
            id: "cfe1d618-c7ac-4e70-811b-ea3c0554dfa4",
            checked: false,
            value: "Scuba diving\nHike\nHistoric Site\nWaterfalls",
          },
        ],
      },
      {
        id: "9155922e-ac77-405e-8f89-9145e9ae6c18",
        name: "Dream Travel Locations",
        type: "todo",
        category: "personal",
        content: [
          {
            id: "fc5248d8-c04f-4cf5-9b2e-994bfdd280cd",
            checked: false,
            value: "Ireland",
          },
          {
            id: "193caf3e-5ca6-4ad6-9ffc-abe13cfe5ba0",
            checked: false,
            value: "Rockies",
          },
          {
            id: "04e5d07a-80c4-431b-9434-75747ecccbd2",
            checked: false,
            value: "Dominican Republic",
          },
          {
            id: "cb45ca8b-946f-47e2-88be-1b732317a49c",
            checked: true,
            value: "Australia",
          },
          {
            id: "20d0bab0-d2dc-45e6-8b97-822a9ad0fb61",
            checked: false,
            value: "Costa Rica",
          },
          {
            id: "d381c98e-41d8-488f-a390-9c11c15a09f7",
            checked: true,
            value: "Italy",
          },
        ],
      },
      {
        id: "362580ae-05f1-4924-9522-9541046a99e3",
        name: "Groceries",
        type: "todo",
        category: "personal",
        content: [
          {
            id: "2f5a8cdf-181f-4daa-922e-27cb990a4982",
            checked: false,
            value: "Bread",
          },
          {
            id: "d7822e68-8775-4557-91b4-87f7c8c0d48c",
            checked: false,
            value: "Milk",
          },
          {
            id: "7f598a1f-1539-40a5-871d-a1998ebf484a",
            checked: false,
            value: "Yogurt",
          },
          {
            id: "5edce34a-c474-4093-999f-da9ede164bf0",
            checked: false,
            value: "Chicken",
          },
          {
            id: "2a631303-6011-45dd-a2c0-b977a9c4e4f5",
            checked: false,
            value: "Ham",
          },
          {
            id: "329827f0-16bf-4d92-b0e1-4aeb74e5a2b0",
            checked: false,
            value: "Cheese",
          },
          {
            id: "c76e19e9-405b-43a5-a9b9-75d92c2280df",
            checked: false,
            value: "Peanut Butter",
          },
          {
            id: "7c54fae0-9c41-4420-a78d-0661a3848ad2",
            checked: false,
            value: "Cream Cheese",
          },
          {
            id: "5f09cd01-2910-4642-b4c1-cf21303c67e7",
            checked: false,
            value: "Pita",
          },
          {
            id: "dda6fe9b-c879-4fc3-9211-a49ea394aad0",
            checked: false,
            value: "Red Pepper",
          },
        ],
      },
      {
        id: "930c3a28-7d8f-49dc-8684-2c0ad22e38ba",
        name: "Things to Fix",
        type: "todo",
        category: "personal",
        content: [
          {
            id: "497c9192-c982-4b63-a465-67b4782fa4ed",
            checked: false,
            value: "Lawnmower",
          },
          {
            id: "c55721f3-4852-413f-b4cf-657c2db7a424",
            checked: false,
            value: "Scratch on wall",
          },
        ],
      },
      {
        id: "c4873115-2004-401f-9fd2-6d3dfe13ada0",
        name: "Quote",
        type: "text",
        category: "personal",
        content: [
          {
            id: "eaceebfc-bc0d-42db-b851-e6506f5abd4e",
            checked: false,
            value:
              '"The price of success is hard work, dedication to the job at hand, and the determination that whether we win or lose, we have applied the best of ourselves to the task at hand."\n\n~Vince Lombardi',
          },
        ],
      },
    ])
  );
}

//State Interface
const initialState: notesStateType = {
  notes: JSON.parse(localStorage.getItem("notes") ?? "[]"),
};

//Actions
export const notesSlice = createSlice({
  name: "notesManager",
  initialState,
  reducers: {
    createNote: (state: notesStateType, action: PayloadAction<noteType>) => {
      state.notes.push(action.payload);
      updateStorage(state);
    },
    deleteNote: (state: notesStateType, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (item: noteType) => item.id !== action.payload
      );
      updateStorage(state);
    },
    updateNoteName: (
      state: notesStateType,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.notes.forEach((note: noteType) => {
        if (note.id === action.payload.id) note.name = action.payload.name;
      });
      updateStorage(state);
    },
    updateNoteContent: (
      state: notesStateType,
      action: PayloadAction<{
        id: string;
        contentId: string;
        checked: boolean;
        value: string;
      }>
    ) => {
      state.notes.forEach((note: noteType) => {
        if (note.id === action.payload.id) {
          note.content.forEach((content: contentType, index: number) => {
            if (content.id === action.payload.contentId) {
              content.value = action.payload.value;
              content.checked = action.payload.checked;
            }
          });
        }
      });
      updateStorage(state);
    },
    addNoteItem: (
      state: notesStateType,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      state.notes.forEach((note: noteType) => {
        if (note.id === action.payload.id)
          note.content.push({
            id: action.payload.contentId,
            checked: false,
            value: "",
          });
      });
    },
    deleteNoteContent: (
      state: notesStateType,
      action: PayloadAction<{ id: string; contentId: string }>
    ) => {
      state.notes.forEach((note: noteType) => {
        if (note.id === action.payload.id)
          note.content.forEach((content: contentType, index: number) => {
            if (content.id === action.payload.contentId)
              note.content.splice(index, 1);
          });
      });
      updateStorage(state);
    },
  },
});

const updateStorage = (state: notesStateType) => {
  localStorage.setItem("notes", JSON.stringify(state.notes));
};

export const {
  createNote,
  deleteNote,
  updateNoteName,
  updateNoteContent,
  addNoteItem,
  deleteNoteContent,
} = notesSlice.actions;

//Selectors
export const notesStateSelector = (state: RootState) => state.notesManager;

export default notesSlice.reducer;
