import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Function/Type Imports
import { fetchUrl } from "./RssFeedAPI";

//Declared Types
export type rssFeedType = {
  title: string;
  link: string;
  description: string;
  category: Array<string>;
  image: string;
  language: string;
  lastBuildDate: string;
  generator: string;
  copyright: string;
  items?: Array<rssFeedItemType>;
};

export type rssFeedItemType = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  content_encoded: string;
  author: string;
  category: Array<string>;
  enclosures: Array<string>;
  id: string | number;
  media: Object;
};

//State Interface
export interface rssFeedStateType {
  url?: string;
  status: "loading" | "idle" | "failed";
  feed?: rssFeedType;
}

const initialState: rssFeedStateType = {
  url: undefined,
  status: "idle",
  feed: undefined,
};

//Async Actions
export const rssFeedFetchUrl = createAsyncThunk(
  "rssFeed/fetchUrl",
  async (url: string) => {
    const response = await fetchUrl(url);
    return response.data;
  }
);

//Actions
export const rssFeedSlice = createSlice({
  name: "rssFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rssFeedFetchUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rssFeedFetchUrl.fulfilled, (state, action) => {
        state.status = "idle";
        state.feed = action.payload;
      })
      .addCase(rssFeedFetchUrl.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//Selectors
export const feedSelector = (state: RootState) => state.rssFeed.feed;
export const feedStateSelector = (state: RootState) => state.rssFeed;

export default rssFeedSlice.reducer;
