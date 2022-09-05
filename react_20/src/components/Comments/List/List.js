import classes from './List.module.css'
import {useCallback, Fragment} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useLocation, Outlet} from 'react-router-dom'
import Item from './Item'
const Component = props => {
  const slice = useSelector(store => store.pagesComments)
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const routerNavigateHook = useNavigate()
  const routerLocationHook = useLocation()
  const showAddHandler = useCallback(() => {
    if(routerLocationHook.pathname.includes(pagesPathsSlice.comments.add)) {
      routerNavigateHook(-1)
      return
    }
    routerNavigateHook(pagesPathsSlice.comments.add)
  }, [routerLocationHook, pagesPathsSlice, routerNavigateHook])
  const DOM = <ul className={classes.list}>
    {slice.list.map(item => <Item key={item.id} item={item}/>)}
  </ul>
  return <Fragment>
    <button className={classes.button} type='button' onClick={showAddHandler}>
      {routerLocationHook.pathname.includes(pagesPathsSlice.comments.add) ? 'cancel' : 'add'}
    </button>
    <Outlet/>
    {DOM}
  </Fragment>
}
export default Component