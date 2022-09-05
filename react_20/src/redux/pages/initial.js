import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: 'pagesInitial',
  initialState: {
    quotes: {
      fetch: {
        list: null
      }
    },
    comments: {
      fetch: {
        list: null
      }
    }
  },
  reducers: {
    setFetch: (slice, props) => {
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        if(props.payload.props.errorMessage) {
          slice[sliceTailArray[0]] = false
          return
        }
        slice[sliceTailArray[0]] = true
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      if(props.payload.props.errorMessage) {
        sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = false
        return
      }
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = true
    },
    resetFetch: (slice, props) => {
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]] = null
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = null
    }
  }
})



export const reducer = slice.reducer
export const actions = slice.actions
export default slice