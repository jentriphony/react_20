import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesPaths',
  initialState: {
    quotes: {
      quotes: '/quotes',
      item: ':id',
      list: 'list',
      add: 'add'
    },
    comments: {
      comments: 'comments',
      add: 'add'
    }
  }
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice