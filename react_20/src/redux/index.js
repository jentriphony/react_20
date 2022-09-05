import { configureStore } from '@reduxjs/toolkit'
import { reducer as pagesCommentsSliceReducer } from './pages/comments/comments'
import { reducer as pagesQuotesSliceReducer } from './pages/quotes/quotes'
import { reducer as pagesInitialSliceReducer } from './pages/initial'
import { reducer as pagesPathsSliceReducer } from './pages/paths'
import { reducer as pagesUrlsSliceReducer } from './pages/urls'
import { reducer as uiLayoutHeaderNotificationSliceReducer } from './ui/layout-header-notification'
const store = configureStore({
  reducer: {
    pagesComments: pagesCommentsSliceReducer,
    pagesQuotes: pagesQuotesSliceReducer,
    pagesInitial: pagesInitialSliceReducer,
    pagesPaths: pagesPathsSliceReducer,
    pagesUrls: pagesUrlsSliceReducer,
    uiLayoutHeaderNotification: uiLayoutHeaderNotificationSliceReducer
  }
})
export default store