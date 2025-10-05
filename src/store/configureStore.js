import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.store'
import searchReducer from './search.store'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
})
