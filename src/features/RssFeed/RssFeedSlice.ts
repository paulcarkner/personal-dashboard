import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

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
//USAGE: dispatch(RssFeedFetchUrl(url))
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
  reducers: {
    /*
    //USAGE: dispatch(sampleAction1)
    sampleAction1: (state) => {
      state.value += 1;
    },
    //USAGE: dispatch(sampleAction2(var))
    sampleAction2: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    */
  },
  extraReducers: (builder) => {
    //handle imported actions or Thunk status
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

/*
//export actions
export const { sampleAction1, sampleAction2 } = sampleSlice.actions;
*/

/*
//USAGE: dispatch(sampleTypedThunkAction(var))
export const sampleTypedThunkAction =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = sampleSelector(getState());
    if (currentValue % 2 === 1) {
      dispatch(sampleAction2(amount));
    }
  };
*/

//Selectors
//USAGE: useAppSelector(sampleSelector)
export const FeedSelector = (state: RootState) => state.RssFeed.feed;
export const FeedStateSelector = (state: RootState) => state.RssFeed;

export default RssFeedSlice.reducer;
