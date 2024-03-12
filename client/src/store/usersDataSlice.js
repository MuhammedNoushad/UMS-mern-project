import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setData } = userDataSlice.actions;
export default userDataSlice.reducer;
