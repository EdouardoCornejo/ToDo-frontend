import { configureStore } from '@reduxjs/toolkit'
import SessionReducer  from './slices/sessionSlice'

export const store = configureStore({
  reducer: {
    session: SessionReducer
  },
})