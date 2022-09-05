import classes from './Header.module.css'
import Navigation from './Navigation'
import Notification from './Notification'
const Component = props => {
  return <header className={classes.header}>
    <span>header</span>
    <Navigation/>
    <Notification/>
  </header>
}
export default Component