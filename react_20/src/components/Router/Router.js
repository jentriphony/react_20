import {lazy, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {Routes, Route, Navigate} from 'react-router-dom'
import Loading from './../UI/Loading'
const PagesQuotes = lazy(() => import('./../../pages/Quotes/Quotes'))
const QuotesItem = lazy(() => import('./../Quotes/Item/Item'))
const QuotesList = lazy(() => import('./../Quotes/List/List'))
const QuotesAdd =  lazy(() => import('./../Quotes/Add/Add'))
const CommentsList = lazy(() => import('./../Comments/List/List'))
const CommentsAdd = lazy(() => import('./../Comments/Add/Add'))
const NotFound  = lazy(() => import('./../../pages/NotFound'))
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  return <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path={`${pagesPathsSlice.quotes.quotes}/*`} element={<PagesQuotes/>}>
        <Route path={pagesPathsSlice.quotes.item} element={<QuotesItem/>}>
          <Route path={pagesPathsSlice.comments.comments} element={<CommentsList/>}>
            <Route path={pagesPathsSlice.comments.add} element={<CommentsAdd/>}/>
          </Route>
        </Route>
        <Route path={pagesPathsSlice.quotes.list} element={<QuotesList/>}/>
        <Route path={pagesPathsSlice.quotes.add} element={<QuotesAdd/>}/>
      </Route>
      <Route path='/' element={<Navigate to={pagesPathsSlice.quotes.quotes} replace={true}/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </Suspense>
}
export default Component