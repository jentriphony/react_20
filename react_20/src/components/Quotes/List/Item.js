import classes from './Item.module.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  return (
    <div className={classes.item}>
      <span>{props.item.text}</span>
      <span>{props.item.author}</span>
      <Link to={`${pagesPathsSlice.quotes.quotes}/${props.item.id}`}>
        visit
      </Link>
    </div>
  )
}
export default Component