import classes from './Input.module.css'
import useInput from './../../hooks/ui/input'
import ErrorMessage from './ErrorMessage'
const Component = props => {
  const {
    formActive,
    validationHandler,
    value,
    setValue,
    label,
    input,
    textarea
  } = props
  const inputHook = useInput({formActive, validationHandler, value, setValue})
  return <div className={classes.input}>
    <label>{label}</label>
    {input && (
      <input
        {...input}
        value={value.value}
        onBlur={inputHook.blurHandler}
        onInput={inputHook.inputHandler}
      />
    ) }
    {textarea && (
      <textarea
        {...textarea}
        value={value.value}
        onBlur={inputHook.blurHandler}
        onInput={inputHook.inputHandler}
      />
    )}
    {inputHook.showError && (
      <ErrorMessage message='error_input' />
    )}
  </div>
}
export default Component