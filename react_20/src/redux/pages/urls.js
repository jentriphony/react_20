import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesUrls',
  initialState: {
    quotes: {
      fetch: {
        index: 'http://localhost:8000/api/comments'
      }
    },
    comments: {
      fetch: {
        index: 'http://localhost:8000/api/comments'
      }
    }
  }
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice