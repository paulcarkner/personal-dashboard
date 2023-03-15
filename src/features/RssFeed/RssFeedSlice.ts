import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Function/Type Imports
import { fetchUrl } from "./RssFeedAPI";

//Declared Types
export type RssFeedType = {
  title: string;
  link: string;
  description: string;
  category: Array<string>;
  image: string;
  language: string;
  lastBuildDate: string;
  generator: string;
  copyright: string;
  items?: Array<RssFeedItemType>;
};

export type RssFeedItemType = {
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
export interface RssFeedStateType {
  url?: string;
  status: "loading" | "idle" | "failed";
  feed?: RssFeedType;
}

const initialState: RssFeedStateType = {
  url: undefined,
  status: "idle",
  feed: undefined,
};

//Async Actions
export const RssFeedFetchUrl = createAsyncThunk(
  "RssFeed/fetchUrl",
  async (url: string) => {
    const response = await fetchUrl(url);
    return response.data;
  }
);

//Actions
export const RssFeedSlice = createSlice({
  name: "RssFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RssFeedFetchUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RssFeedFetchUrl.fulfilled, (state, action) => {
        state.status = "idle";
        state.feed = action.payload;
      })
      .addCase(RssFeedFetchUrl.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//Selectors
export const FeedSelector = (state: RootState) => state.RssFeed.feed;
export const FeedStateSelector = (state: RootState) => state.RssFeed;

export default RssFeedSlice.reducer;
