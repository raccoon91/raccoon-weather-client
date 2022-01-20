import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "api";
import type { AxiosResponse } from "axios";

const initialClimateState: IClimate = {
  years: null,
  tempClimates: null,
  feelTempClimates: null,
  rainClimates: null,
};

export const getClimate = createAsyncThunk("climate/getClimate", async () => {
  try {
    const city = window.localStorage.getItem("city") || "seoul";

    const response: AxiosResponse<IClimate> = await serverApi({
      method: "get",
      url: `climates/${city}`,
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

      const { years, tempClimates, feelTempClimates, rainClimates } = action.payload;

      state.years = years;
      state.tempClimates = tempClimates;
      state.feelTempClimates = feelTempClimates;
      state.rainClimates = rainClimates;
    }),
});
