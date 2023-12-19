import { createSlice } from "@reduxjs/toolkit";
import { createContext, useContext, useEffect } from "react";

const initialState = {
  batch: JSON.parse(localStorage.getItem("batch")) || [],
  isFetching: false,
  error: false,
};

const batchSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_BATCH: (state, action) => {
      state.batch = action.payload;
      state.isFetching = true;
      state.error = false;
    },
    GETTING_FAIL: (state) => {
      state.batch = [];
      state.isFetching = false;
      state.error = true;
    },
    CLEAR_BATCH: (state) => {
      state.batch = [];
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { GET_BATCH, GETTING_FAIL,CLEAR_BATCH } = batchSlice.actions;
export default batchSlice.reducer;
