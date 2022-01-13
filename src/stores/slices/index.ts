import { combineReducers } from "@reduxjs/toolkit";
import { todaySlice } from "./todaySlice";
import { climateSlice } from "./climateSlice";

const rootReducer = combineReducers({
  today: todaySlice.reducer,
  climate: climateSlice.reducer,
});

export default rootReducer;
