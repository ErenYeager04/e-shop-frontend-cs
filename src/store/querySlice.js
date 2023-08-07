import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: ""
}


export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    makeQuery: (state, action) => {
      const { query } = action.payload;
      state.query = query
    },
  },
})

export const { makeQuery } = querySlice.actions
export default querySlice.reducer