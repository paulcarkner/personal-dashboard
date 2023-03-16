import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchJson } from "../../app/utils";

//Declared Types
export type dataChartStateType = {
  dataSources: Array<{
    url: string;
    status: string;
    data: any;
  }>;
};

export type jsonStatusType = "idle" | "pending" | "fulfilled" | "failed";

//State Interface
const initialState: dataChartStateType = {
  dataSources: [],
};

//Actions
export const fetchDataSource = createAsyncThunk(
  "dataChartManager/fetchDataSource",
  async (props: { url: string }) => {
    const response = await fetchJson(props.url);
    return response.data;
  },
  {
    condition: (props: { url: string }, { getState }) => {
      const state: any = getState();
      return !state.dataChartManager.dataSources.some(
        (source: { url: string; status: string; data: any }) =>
          source.url === props.url
      );
    },
  }
);

export const dataChartSlice = createSlice({
  name: "dataChartManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSource.pending, (state, action) => {
        let url: string = action.meta.arg.url;
        addDataSourceIfMissing(url, state);
        setDataSourceStatus(url, state, "pending");
      })
      .addCase(fetchDataSource.fulfilled, (state, action) => {
        let url: string = action.meta.arg.url;
        setDataSourceData(url, state, action.payload);
        setDataSourceStatus(url, state, "fulfilled");
      })
      .addCase(fetchDataSource.rejected, (state, action) => {
        let url: string = action.meta.arg.url;
        setDataSourceStatus(url, state, "failed");
      });
  },
});

const addDataSourceIfMissing = (url: string, state: dataChartStateType) => {
  if (!state.dataSources.some((source) => source.url === url))
    state.dataSources.push({
      url: url,
      status: "idle",
      data: undefined,
    });
};

const setDataSourceStatus = (
  url: string,
  state: dataChartStateType,
  status: jsonStatusType
) => {
  state.dataSources
    .filter((source) => source.url === url)
    .forEach((source) => (source.status = status));
};

const setDataSourceData = (
  url: string,
  state: dataChartStateType,
  data: any
) => {
  state.dataSources
    .filter((source) => source.url === url)
    .forEach((source) => (source.data = data));
};

//Selectors
export const dataChartStateSelector = (state: RootState) =>
  state.dataChartManager;

export default dataChartSlice.reducer;
