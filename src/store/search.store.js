import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  globalSearch: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setGlobalSearch: (state, action) => {
      state.globalSearch = action.payload
    },
  },
})

export const { setGlobalSearch } = searchSlice.actions
export default searchSlice.reducer