import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { todaySlice } from "./todaySlice";
import { climateSlice } from "./climateSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  today: todaySlice.reducer,
  climate: climateSlice.reducer,
});

export default rootReducer;
