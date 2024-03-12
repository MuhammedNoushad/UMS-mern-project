import { configureStore } from "@reduxjs/toolkit";
import usersDataSlice from "./usersDataSlice";
import userDataSlice from "./userDataSlice";

const store = configureStore({
  reducer: {
    users: usersDataSlice,
    userData: userDataSlice,
  },
});

export default store;
