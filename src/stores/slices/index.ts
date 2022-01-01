import { combineReducers } from "@reduxjs/toolkit";
import { todaySlice } from "./todaySlice";
import { climateSlice } from "./climateSlice";

export const { changeCity } = todaySlice.actions;

const rootReducer = combineReducers({
  today: todaySlice.reducer,
  climate: climateSlice.reducer,
});

export default rootReducer;
