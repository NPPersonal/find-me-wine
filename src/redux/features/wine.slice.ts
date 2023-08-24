import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, store } from "../store";

const API_ENDPOINT = process.env.NEXT_PUBLIC_WINE_FINDER_API;

type QueryStatus = "idle" | "fetching" | "success" | "fail";
type QueryError = any | null;

type WineState = {
  numUniqueWines: {
    status: QueryStatus;
    error: QueryError;
    value: number;
  };
  numUniqueCountries: {
    status: QueryStatus;
    error: QueryError;
    value: number;
  };
  foundWines: {
    status: QueryStatus;
    error: QueryError;
    totalPage: number;
    totalResults: number;
    wineList: [];
  };
};

const initWineState: WineState = {
  numUniqueWines: { status: "idle", error: null, value: 0 },
  numUniqueCountries: { status: "idle", error: null, value: 0 },
  foundWines: {
    status: "idle",
    error: null,
    totalPage: 0,
    totalResults: 0,
    wineList: [],
  },
};

export const fetchNumUniqueWines = createAsyncThunk(
  "wine/fetch_num_unique_wines",
  async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/list-of/`, {
        withCredentials: false,
        params: {
          column_name: "title",
        },
      });

      return res.data.total_results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching number of unique wines");
    }
  }
);

export const fetchNumUniqueCountries = createAsyncThunk(
  "wine/fetch_num_unique_countries",
  async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/list-of/`, {
        params: {
          column_name: "country",
        },
      });

      return res.data.total_results;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching number of unique countries");
    }
  }
);

const selectWine = (state: any) => state.wine;

export const selectNumUniqueWines = createSelector(
  selectWine,
  (wine: WineState) => wine.numUniqueWines
);

export const selectNumUniqueCountries = createSelector(
  selectWine,
  (wine: WineState) => wine.numUniqueCountries
);

const wine = createSlice({
  name: "wine",
  initialState: initWineState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNumUniqueWines.pending, (state, action) => {
        state.numUniqueWines.status = "fetching";
      })
      .addCase(fetchNumUniqueWines.fulfilled, (state, action) => {
        state.numUniqueWines.status = "success";
        state.numUniqueWines.value = action.payload;
      })
      .addCase(fetchNumUniqueWines.rejected, (state, action) => {
        state.numUniqueWines.status = "fail";
        state.numUniqueWines.error = action.payload;
      })
      .addCase(fetchNumUniqueCountries.pending, (state, action) => {
        state.numUniqueCountries.status = "fetching";
      })
      .addCase(fetchNumUniqueCountries.fulfilled, (state, action) => {
        state.numUniqueCountries.status = "success";
        state.numUniqueCountries.value = action.payload;
      })
      .addCase(fetchNumUniqueCountries.rejected, (state, action) => {
        state.numUniqueCountries.status = "fail";
        state.numUniqueCountries.error = action.payload;
      });
  },
});

export default wine.reducer;
