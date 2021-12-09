import { combineReducers } from "@reduxjs/toolkit";
import { currentSlice } from "./currentSlice";
import { todaySlice } from "./todaySlice";

const rootReducer = combineReducers({
  current: currentSlice.reducer,
  today: todaySlice.reducer,
});

export default rootReducer;
