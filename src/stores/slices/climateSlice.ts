import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "api";
import type { AxiosResponse } from "axios";

const initialClimateState: IClimate = {
  years: null,
  tempClimates: null,
  maxTempClimates: null,
  rainClimates: null,
  covidDates: null,
  cases: null,
  caseIncrements: null,
};

export const getClimate = createAsyncThunk("climate/getClimate", async (cityName?: string) => {
  try {
    const search = cityName || localStorage.getItem("search") || "seoul";

    const response: AxiosResponse<IClimate> = await serverApi({
      method: "get",
      url: `climates/${search}`,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const climateSlice = createSlice({
  name: "climateSlice",
  initialState: initialClimateState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getClimate.fulfilled, (state, action) => {
      if (!action.payload) return;

      const { years, tempClimates, maxTempClimates, rainClimates, covidDates, cases, caseIncrements } = action.payload;

      state.years = years;
      state.tempClimates = tempClimates;
      state.maxTempClimates = maxTempClimates;
      state.rainClimates = rainClimates;
      state.covidDates = covidDates;
      state.cases = cases;
      state.caseIncrements = caseIncrements;
    }),
});
