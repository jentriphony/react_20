import { useCallback, useContext } from 'react'
import FetchContext from './../../context/fetch'
import { useSelector, useDispatch } from 'react-redux'
const Hook = props => {
  const fetchContext = useContext(FetchContext)
  const {
    sliceFetchAction,
    onStart,
    onSuccess,
    onError,
    onFinish,
    urlTail,
    configuration,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail,
    sliceTail
  } = props
  const dispatch = useDispatch()
  const handler = useCallback(() => dispatch(sliceFetchAction({
    onStart,
    onSuccess,
    onError,
    onFinish,
    handler: fetchContext.handler,
    urlTail,
    configuration,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail
  })), [
    dispatch,
    sliceFetchAction,
    onStart,
    onSuccess,
    onError,
    onFinish,
    fetchContext,
    urlTail,
    configuration,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail
  ])
  const slice = useSelector(store => store[sliceTail])
  return {
    handler,
    slice
  }
}
export default Hook