import classes from './Item.module.css'
const Component = props => {
  return <div className={classes.item}>
    <span>{props.item.text}</span>
  </div>
}
export default Component