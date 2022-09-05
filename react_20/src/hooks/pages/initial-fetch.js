import {
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react'
import FetchContext from './../../context/fetch'
import { useSelector, useDispatch } from 'react-redux'
import { actions as pagesInitialSliceActions } from './../../redux/pages/initial'
const Hook = props => {
  const {
    initialSliceTail,
    sliceFetchAction,
    onStart,
    onSuccess,
    onError,
    onFinish: onFinishProp,
    urlTail,
    configuration,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail,
    sliceTail
  } = props
  const initialSlice = useSelector(store => store.pagesInitial)
  const initialSliceWithTailHandler = useCallback(() => {
    const initialSliceTailArray = initialSliceTail.split('.')
    let initialSliceWithTail = initialSlice
    for(let iterator = 0; iterator < initialSliceTailArray.length; ++iterator)
      initialSliceWithTail = initialSliceWithTail[initialSliceTailArray[iterator]]
    return initialSliceWithTail
  }, [initialSliceTail, initialSlice])
  const [initialSliceWithTail, setInitialSliceWithTail] = useState(initialSliceWithTailHandler())
  const dispatch = useDispatch()
  const onFinish = useCallback(callbackProps => {
    dispatch(pagesInitialSliceActions.setFetch({
      props: callbackProps,
      sliceTail: initialSliceTail
    }))
    onFinishProp && onFinishProp(callbackProps)
  }, [dispatch, initialSliceTail, onFinishProp])
  const fetchContext = useContext(FetchContext)
  useEffect(() => {
    !initialSliceWithTail && dispatch(sliceFetchAction({
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
    }))
  }, [
    initialSliceWithTail,
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
  return { slice }
}
export default Hook