import { configureStore } from '@reduxjs/toolkit'
import SessionReducer  from './slices/sessionSlice'

/* Creating a store with the reducer. */
export const store = configureStore({
  reducer: {
    session: SessionReducer
  },
})