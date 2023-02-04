import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchJson } from "../../app/utils";

//Declared Types
export type DataChartStateType = {
  dataSources: Array<{
    url: string;
    status: string;
    data: any;
  }>;
};

export type JsonStatusType = "idle" | "pending" | "fulfilled" | "failed";

//State Interface
const initialState: DataChartStateType = {
  dataSources: [],
};

//Actions
export const FetchDataSource = createAsyncThunk(
  "DataChartManager/FetchDataSource",
  async (props: { url: string }) => {
    const response = await fetchJson(props.url);
    return response.data;
  }
);

export const DataChartSlice = createSlice({
  name: "DataChartManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchDataSource.pending, (state, action) => {
        let url: string = action.meta.arg.url;
      })
      .addCase(FetchDataSource.fulfilled, (state, action) => {
        let url: string = action.meta.arg.url;
      })
      .addCase(FetchDataSource.rejected, (state, action) => {
        let url: string = action.meta.arg.url;
      });
  },
});

const addDataSourceIfMissing = (url: string, state: DataChartStateType) => {
  if (!state.dataSources.some((source) => source.url === url))
    state.dataSources.push({
      url: url,
      status: "idle",
      data: undefined,
    });
};

const setDataSourceStatus = (
  url: string,
  state: DataChartStateType,
  status: JsonStatusType
) => {
  state.dataSources
    .filter((source) => source.url === url)
    .forEach((source) => (source.status = status));
};

const setDataSourceData = (
  url: string,
  state: DataChartStateType,
  data: any
) => {
  state.dataSources
    .filter((source) => source.url === url)
    .forEach((source) => (source.data = data));
};

//Selectors
export const DataChartStateSelector = (state: RootState) =>
  state.DataChartManager;

export default DataChartSlice.reducer;
