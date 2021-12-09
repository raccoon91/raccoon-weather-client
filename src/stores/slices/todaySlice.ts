import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "api";

const todayData = {
  feel: "8",
  humid: "81",
  rain: "19",
  pm10: "81",
  pm25: "76",
  wind: "10",
};

const initialTodayState: ITodayWeather = {
  feel: "",
  humid: "",
  rain: "",
  pm10: "",
  pm25: "",
  wind: "",
};

export const getTodayWeather = createAsyncThunk("today/getTodayWeather", async () => {
  try {
    const response = await fakeApi(todayData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const todaySlice = createSlice({
  name: "todaySlice",
  initialState: initialTodayState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getTodayWeather.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      const { feel, humid, rain, pm10, pm25, wind } = action.payload;

      state.feel = feel;
      state.humid = humid;
      state.rain = rain;
      state.pm10 = pm10;
      state.pm25 = pm25;
      state.wind = wind;
    }),
});
