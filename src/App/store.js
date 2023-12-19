import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import batchReducer from "../Features/BatchSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    batch: batchReducer,
  },
});
