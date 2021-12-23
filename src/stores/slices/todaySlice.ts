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

const randomForecast = (hour: number): ITodayForecast => {
  const temp = Math.floor(Math.random() * (50 + 40 + 1)) - 30;

  return {
    date: `2021-12-20 ${hour}:00`,
    sky: "sunny",
    temp: String(temp),
    feel: String(temp - 5),
    rain: String(Math.floor(Math.random() * (100 + 1))),
    wind: String(Math.floor(Math.random() * (20 + 1))),
    humid: String(Math.floor(Math.random() * (100 + 1))),
  };
};

const todayForecastDataList = [
  randomForecast(15),
  randomForecast(16),
  randomForecast(17),
  randomForecast(18),
  randomForecast(19),
  randomForecast(20),
  randomForecast(21),
  randomForecast(22),
  randomForecast(23),
];

const initialTodayState: ITodayWeather = {
  feel: "",
  humid: "",
  rain: "",
  pm10: "",
  pm25: "",
  wind: "",
  todayForcast: [],
};

export const getTodayWeather = createAsyncThunk("today/getTodayWeather", async () => {
  try {
    const response = await fakeApi({ ...todayData, todayForcast: todayForecastDataList });

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

      const { feel, humid, rain, pm10, pm25, wind, todayForcast } = action.payload;

      state.feel = feel;
      state.humid = humid;
      state.rain = rain;
      state.pm10 = pm10;
      state.pm25 = pm25;
      state.wind = wind;
      state.todayForcast = todayForcast;
    }),
});
