import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
