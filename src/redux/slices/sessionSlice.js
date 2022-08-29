import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  token: undefined
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setToken, logout } = sessionSlice.actions

export default sessionSlice.reducer