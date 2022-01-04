import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "api";
import { formatDate, getFeelTemp } from "utils";
import type { AxiosResponse } from "axios";

const initialTodayState: ITodayWeather = {
  search: "",
  city: null,
  today: "",
  sky: 0,
  temp: 0,
  feel: 0,
  humid: 0,
  rain: 0,
  rainType: 0,
  pm10: 0,
  pm25: 0,
  wind: 0,
  windDirection: 0,
  todayForcast: [],
};

export const getCurrentWeather = createAsyncThunk("current/getCurrentWeather", async () => {
  try {
    const search = window.localStorage.getItem("search") || "seoul";

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

        const { city, date, temp, humid, rain, rainType, wind, windDirection, pm10, pm25 } = action.payload;

        state.city = city;
        state.today = formatDate(date);
        state.sky = 1;
        state.temp = temp;
        state.feel = getFeelTemp(temp, wind);
        state.humid = humid;
        state.rain = rain;
        state.rainType = rainType;
        state.wind = wind;
        state.windDirection = windDirection;
        state.pm10 = pm10;
        state.pm25 = pm25;
      })
      .addCase(getTodayForecast.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const todayForcasts = action?.payload?.map((forecast) => ({
          ...forecast,
          feel: getFeelTemp(forecast.temp, forecast.wind),
        }));

        state.todayForcast = todayForcasts;
      }),
});
