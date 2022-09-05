import classes from './Item.module.css'
import {useCallback, useEffect, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actions as pagesInitialSliceActions } from './../../../redux/pages/initial'
import {actions as pagesCommentsSliceActions} from './../../../redux/pages/comments/comments'
import {fetchAction as sliceFetchAction} from './../../../redux/pages/quotes/quotes'
import {fetchAction as pagesCommentsSliceFetchAction} from './../../../redux/pages/comments/comments'
import {useParams, useNavigate, Outlet, useLocation} from 'react-router-dom'
import usePagesInitialFetch from './../../../hooks/pages/initial-fetch'
import usePagesFetch from './../../../hooks/pages/fetch'
import ItemNotFound from './../../UI/ItemNotFound'
const Component = props => {
  const routerParamsHook = useParams()
  const slice = usePagesInitialFetch({
    initialSliceTail: 'quotes.fetch.list',
    sliceFetchAction,
    urlTail: 'index',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list',
    sliceTail: 'pagesQuotes'
  }).slice
  const item = slice.list.find(item => item.id === routerParamsHook.id)
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const routerNavigateHook = useNavigate()
  const dispatch = useDispatch()
  const pagesFetchHookOnFinish = useCallback(callbackProps => {
    dispatch(pagesInitialSliceActions.setFetch({
      props: callbackProps,
      sliceTail: 'comments.fetch.list'
    }))
    routerNavigateHook(`${pagesPathsSlice.comments.comments}`)
  }, [dispatch, routerNavigateHook, pagesPathsSlice])
  const pagesFetchHook = usePagesFetch({
    sliceFetchAction: pagesCommentsSliceFetchAction,
    onFinish: pagesFetchHookOnFinish,
    urlTail: 'index',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list',
    sliceTail: 'pagesComments'
  })
  const routerLocationHook = useLocation()
  const pagesInitialSlice = useSelector(store => store.pagesInitial)
  const showCommentsListHandler = useCallback(() => {
    if(pagesInitialSlice.comments.fetch.list === null && !routerLocationHook.pathname.includes(pagesPathsSlice.comments.comments)) {
      pagesFetchHook.handler()
      return
    }
    if(routerLocationHook.pathname.includes(pagesPathsSlice.comments.comments)) {
      routerNavigateHook(-1)
      return
    } else routerNavigateHook(1)
  }, [pagesInitialSlice, pagesFetchHook, routerLocationHook, pagesPathsSlice, routerNavigateHook])
  const onLeave = useCallback(() => {
    dispatch(pagesInitialSliceActions.resetFetch({sliceTail: 'comments.fetch.list'}))
    dispatch(pagesCommentsSliceActions.reset({sliceTail: 'list'}))
  }, [dispatch])
  useEffect(() => {
    return onLeave
  }, [onLeave])
  return <Fragment>
    {item && <Fragment>
      <div className={classes.item}>
        <span>{item.text}</span>
        <span>{item.author}</span>
      </div>
      <span>comments</span>
      <button className={classes.button} type='button' onClick={showCommentsListHandler}>
        {routerLocationHook.pathname.includes(pagesPathsSlice.comments.comments) ? 'hide' : 'show'}
      </button>
      <Outlet />
    </Fragment>}
    {!item && pagesInitialSlice.quotes.fetch.list && <ItemNotFound message='quote not found'/>}
  </Fragment>
}
export default Component