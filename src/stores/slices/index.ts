import { combineReducers } from "@reduxjs/toolkit";
import { currentSlice } from "./currentSlice";
import { todaySlice } from "./todaySlice";
import { climateSlice } from "./climateSlice";

const rootReducer = combineReducers({
  current: currentSlice.reducer,
  today: todaySlice.reducer,
  climate: climateSlice.reducer,
});

export default rootReducer;
