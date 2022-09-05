import classes from './Quotes.module.css'
import {Outlet} from 'react-router-dom'
const Page = props => {
  return (
    <section className={classes.quotes}>
      <span>quotes</span>
      <Outlet />
    </section>
  )
}
export default Page