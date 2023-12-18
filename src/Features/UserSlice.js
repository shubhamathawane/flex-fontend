import { createSlice } from "@reduxjs/toolkit";
import { createContext, useContext, useEffect } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_START: (state) => {
      state.user = null;
      state.isFetching = true;
      state.error = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    LOGIN_FAILURE: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = true;
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = null;
    },
    UPDATE_STATE: (state, action) => {
      state.isFetching = true;
    },
    UPDATE_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    UPDATE_FAILURE: (state, action) => {
      state.user = null;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_FAILURE,
  UPDATE_SUCCESS,
  UPDATE_STATE,
} = userSlice.actions;
export default userSlice.reducer;
