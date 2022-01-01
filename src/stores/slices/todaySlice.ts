import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "api";
import dayjs from "dayjs";
import { getFeelTemp } from "utils";
import type { AxiosResponse } from "axios";

const initialTodayState: ITodayWeather = {
  city: "",
  today: "",
  sky: 0,
  temp: 0,
  feel: 0,
  humid: 0,
  rain: 0,
  pm10: 0,
  pm25: 0,
  wind: 0,
  windDirection: 0,
  todayForcast: [],
};

export const getCurrentWeather = createAsyncThunk("current/getCurrentWeather", async () => {
  try {
    const city = window.localStorage.getItem("city") || "seoul";

    const response: AxiosResponse<IWeatherData> = await serverApi({
      method: "get",
      url: `weathers/${city}`,
    });

    if (response.status === 200) {
      return { city, ...response.data };
    }
  } catch (error) {
    console.error(error);
  }
});

export const getTodayForecast = createAsyncThunk("today/getTodayForecast", async () => {
  try {
    const city = window.localStorage.getItem("city") || "seoul";

    const response: AxiosResponse<IForecastData[]> = await serverApi({
      method: "get",
      url: `forecasts/${city}`,
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
      const city = action.payload;

      window.localStorage.setItem("city", city);

      state.city = city;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const { city, date, temp, humid, rain, wind, windDirection } = action.payload;

        state.city = city;
        state.today = dayjs(date).subtract(9, "hour").format("MM-DD HH:mm");
        state.sky = 1;
        state.temp = temp;
        state.feel = getFeelTemp(temp, wind);
        state.humid = humid;
        state.rain = rain;
        state.wind = wind;
        state.windDirection = windDirection;
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
