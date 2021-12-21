import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "api";

const currentData = {
  city: "Seoul",
  today: "12/07",
  temp: "27",
  sky: "sunny",
};

const initialCurrentState: ICurrentWeather = {
  city: "",
  today: "",
  temp: "",
  sky: "",
};

export const getCurrentWeather = createAsyncThunk("current/getCurrentWeather", async () => {
  try {
    const city = window.localStorage.getItem("city");

    if (city) {
      currentData.city = city;
    }

    const response = await fakeApi(currentData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const currentSlice = createSlice({
  name: "currentSlice",
  initialState: initialCurrentState,
  reducers: {
    changeCity: (state, action) => {
      const city = action.payload;

      window.localStorage.setItem("city", city);

      state.city = city;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      const { city, today, temp, sky } = action.payload;

      state.city = city;
      state.today = today;
      state.temp = temp;
      state.sky = sky;
    }),
});
