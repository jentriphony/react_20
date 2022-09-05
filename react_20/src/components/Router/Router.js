import { useSelector } from 'react-redux'
import {Routes, Route, Navigate} from 'react-router-dom'
import PagesQuotes from './../../pages/Quotes/Quotes'
import QuotesItem from './../Quotes/Item/Item'
import QuotesList from './../Quotes/List/List'
import QuotesAdd from './../Quotes/Add/Add'
import CommentsList from './../Comments/List/List'
import CommentsAdd from './../Comments/Add/Add'
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  return <Routes>
    <Route path={`${pagesPathsSlice.quotes.quotes}/*`} element={<PagesQuotes/>}>
      <Route path={pagesPathsSlice.quotes.item} element={<QuotesItem/>}>
        <Route path={pagesPathsSlice.comments.comments} element={<CommentsList/>}>
          <Route path={pagesPathsSlice.comments.add} element={<CommentsAdd/>}/>
        </Route>
      </Route>
      <Route path={pagesPathsSlice.quotes.list} element={<QuotesList/>}/>
      <Route path={pagesPathsSlice.quotes.add} element={<QuotesAdd/>}/>
    </Route>
    <Route path='*' element={<Navigate to={pagesPathsSlice.quotes.quotes}/>}/>
  </Routes>
}
export default Component