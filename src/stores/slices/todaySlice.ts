import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "api";
import { formatDate, getFeelTemp } from "utils";
import type { AxiosResponse } from "axios";

const initialTodayState: ITodayWeather = {
  search: "",
  weather: null,
  forecasts: null,
};

export const getWeather = createAsyncThunk("today/getWeather", async (cityName?: string) => {
  try {
    const search = cityName || localStorage.getItem("search") || "seoul";

    const response: AxiosResponse<IWeatherData> = await serverApi({
      method: "get",
      url: `weathers/${search}`,
    });

    if (response.status === 200) {
      return {
        search,
        weather: response.data,
      };
    }
  } catch (error) {
    console.error(error);
  }
});

export const getForecast = createAsyncThunk("today/getForecast", async (cityName?: string) => {
  try {
    const search = cityName || localStorage.getItem("search") || "seoul";

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

      // localStorage.setItem("search", search);

      state.search = search;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        if (!action.payload) return;

        const { search, weather } = action.payload;

        state.search = search;
        state.weather = {
          ...weather,
          today: formatDate(weather.date),
          feel: getFeelTemp(weather.temp, weather.wind),
        };
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        if (!action.payload) return;

        const forecasts = action?.payload?.map((forecast) => ({
          ...forecast,
          feel: getFeelTemp(forecast.temp, forecast.wind),
        }));

        state.forecasts = forecasts;
      }),
});

export const { changeCity } = todaySlice.actions;
