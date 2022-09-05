import classes from './List.module.css'
import {Fragment} from 'react'
import {useSelector} from 'react-redux'
import {fetchAction as sliceFetchAction} from './../../../redux/pages/quotes/quotes'
import usePagesInitialFetch from './../../../hooks/pages/initial-fetch'
import Item from './Item'
import ItemNotFound from './../../UI/ItemNotFound'
const Component = props => {
  const slice = usePagesInitialFetch({
    initialSliceTail: 'quotes.fetch.list',
    sliceFetchAction,
    urlTail: 'index',
    dataTail: 'data',
    actionName: 'set',
    actionSliceTail: 'list',
    sliceTail: 'pagesQuotes'
  }).slice
  const pagesInitialSlice = useSelector(store => store.pagesInitial)
  const DOM = <ul className={classes.list}>
    {slice.list.map(item => <Item key={item.id} item={item} />)}
  </ul>
  return <Fragment>
    {pagesInitialSlice.quotes.fetch.list && slice.list.length > 0 && DOM}
    {pagesInitialSlice.quotes.fetch.list && slice.list.length === 0 && <ItemNotFound message='quotes list empty'/>}
  </Fragment>
}
export default Component