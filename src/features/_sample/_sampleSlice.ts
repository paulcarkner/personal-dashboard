import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

//Function Imports
import { fetchCount } from "./_sampleAPI";

//State Interface
export interface SampleState {
  value: number;
  status: "loading" | "idle" | "failed";
}

const initialState: SampleState = {
  value: 0,
  status: "idle",
};

//Async Actions
//USAGE: dispatch(sampleAsyncAction(var))
export const sampleAsyncAction = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//Actions
export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    //USAGE: dispatch(sampleAction1)
    sampleAction1: (state) => {
      state.value += 1;
    },
    //USAGE: dispatch(sampleAction2(var))
    sampleAction2: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    //handle imported actions or Thunk status
    builder
      .addCase(sampleAsyncAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sampleAsyncAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(sampleAsyncAction.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//export actions
export const { sampleAction1, sampleAction2 } = sampleSlice.actions;

//USAGE: dispatch(sampleTypedThunkAction(var))
export const sampleTypedThunkAction =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = sampleSelector(getState());
    if (currentValue % 2 === 1) {
      dispatch(sampleAction2(amount));
    }
  };

//Selectors
//USAGE: useAppSelector(sampleSelector)
export const sampleSelector = (state: RootState) => state.sample.value;

export default sampleSlice.reducer;
