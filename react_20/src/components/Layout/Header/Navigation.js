import classes from './Navigation.module.css'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const linkActiveClassHandler = useCallback(callbackProps => {
    if(callbackProps.isActive) return classes.active
  }, [])
  return <nav>
    <ul>
      <li>
        <NavLink className={linkActiveClassHandler} to={`${pagesPathsSlice.quotes.quotes}/${pagesPathsSlice.quotes.list}`}>
          list
        </NavLink>
      </li>
      <li>
        <NavLink className={linkActiveClassHandler} to={`${pagesPathsSlice.quotes.quotes}/${pagesPathsSlice.quotes.add}`}>
          add
        </NavLink>
      </li>
    </ul>
  </nav>
}
export default Component