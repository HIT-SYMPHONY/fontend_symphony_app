import { createSlice } from '@reduxjs/toolkit'
import { LocalStorage } from '../constants/localStorage.constant'
const getInitialAuthState = () => {
  try {
    const persistedState = localStorage.getItem(LocalStorage.auth)
    if (persistedState === null) {
      return null
    }
    return JSON.parse(persistedState)
  } catch (e) {
    console.warn('Could not parse auth data from localStorage. Clearing it.', e)
    localStorage.removeItem(LocalStorage.auth)
    return null
  }
}

export const authStore = createSlice({
  name: 'auth',
  initialState: {
    auth: getInitialAuthState(),
  },
  reducers: {
    save: (state, action) => {
      state.auth = action.payload
      try {
        localStorage.setItem(LocalStorage.auth, JSON.stringify(state.auth))
      } catch (e) {
        console.error('Could not save auth state to localStorage.', e)
      }
    },
    clear: (state) => {
      state.auth = null
      try {
        localStorage.removeItem(LocalStorage.auth)
      } catch (e) {
        console.error('Could not clear auth state from localStorage.', e)
      }
    },
  },
})

export const { save, clear } = authStore.actions

export default authStore.reducer
