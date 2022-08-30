import { createSlice } from "@reduxjs/toolkit";
/* Setting the initial state of the reducer. */
const initialState = {
  token: undefined,
};

/* Creating a reducer. */
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
    },
  },
});

export const { setToken, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
