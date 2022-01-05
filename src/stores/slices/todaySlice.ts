import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delayRequest, serverApi } from "api";
import { formatDate, getFeelTemp } from "utils";
import type { AxiosResponse } from "axios";

const initialTodayState: ITodayWeather = {
  search: "",
  weather: null,
  forecasts: null,
};

export const getCurrentWeather = createAsyncThunk("current/getCurrentWeather", async () => {
  try {
    const search = window.localStorage.getItem("search") || "seoul";

    await delayRequest();

    const response: AxiosResponse<IWeatherData> = await serverApi({
      method: "get",
      url: `weathers/${search}`,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const getTodayForecast = createAsyncThunk("today/getTodayForecast", async () => {
  try {
    const search = window.localStorage.getItem("search") || "seoul";

    await delayRequest();

    const response: AxiosResponse<IForecastData[]> = await serverApi({
      method: "get",
      url: `forecasts/${search}`,
    });

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
  reducers: {
    changeCity: (state, action) => {
      const search = action.payload;

      window.localStorage.setItem("search", search);

      state.search = search;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const weather = action.payload;

        state.weather = {
          ...weather,
          today: formatDate(weather.date),
          feel: getFeelTemp(weather.temp, weather.wind),
        };
      })
      .addCase(getTodayForecast.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const forecasts = action?.payload?.map((forecast) => ({
          ...forecast,
          feel: getFeelTemp(forecast.temp, forecast.wind),
        }));

        state.forecasts = forecasts;
      }),
});
