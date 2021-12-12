import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeApi } from "api";

const randomTemp = (year: number) => {
  const result = [];
  const min = -40;
  const max = 50;

  for (let i = 0; i < 30; i++) {
    result.push({ x: year, value: Math.floor(Math.random() * (max - min + 1)) + min });
  }

  return result;
};

const randomRain = (year: number) => {
  const result = { x: year, value: 0 };
  const min = 0;
  const max = 100;

  result.value = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
};

const climateData = {
  tempChartDataList: [
    ...randomTemp(1990),
    ...randomTemp(1991),
    ...randomTemp(1992),
    ...randomTemp(1993),
    ...randomTemp(1994),
    ...randomTemp(1995),
    ...randomTemp(1996),
    ...randomTemp(1997),
    ...randomTemp(1998),
    ...randomTemp(1999),
    ...randomTemp(2000),
    ...randomTemp(2001),
    ...randomTemp(2002),
    ...randomTemp(2003),
    ...randomTemp(2004),
    ...randomTemp(2005),
    ...randomTemp(2006),
    ...randomTemp(2007),
  ],
  rainChartDataList: [
    randomRain(1990),
    randomRain(1991),
    randomRain(1992),
    randomRain(1993),
    randomRain(1994),
    randomRain(1995),
    randomRain(1996),
    randomRain(1997),
    randomRain(1998),
    randomRain(1999),
    randomRain(2000),
    randomRain(2001),
    randomRain(2002),
    randomRain(2003),
    randomRain(2004),
    randomRain(2005),
    randomRain(2006),
    randomRain(2007),
  ],
};

const initialClimateState: IClimate = {
  tempChartDataList: [],
  rainChartDataList: [],
};

export const getClimate = createAsyncThunk("climate/getClimate", async () => {
  try {
    const response = await fakeApi(climateData);

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
      if (!action.payload) {
        return;
      }

      const { tempChartDataList, rainChartDataList } = action.payload;

      state.tempChartDataList = tempChartDataList;
      state.rainChartDataList = rainChartDataList;
    }),
});
