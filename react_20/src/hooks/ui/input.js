import {
  useState,
  useCallback,
  useEffect
} from 'react'
const Hook = props => {
  const {
    formActive,
    validationHandler,
    value,
    setValue
  } = props
  const [active, setActive] = useState(null)
  const blurHandler = useCallback(event => {
    !active && setActive(true)
    setValue(state => ({
      ...state,
      valid: validationHandler(event.target.value)
    }))
  }, [active, setValue, validationHandler])
  const inputHandler = useCallback(event => {
    if((active || formActive) && !value.valid) {
      setValue(state => ({
        ...state,
        value: event.target.value,
        valid: validationHandler(event.target.value)
      }))
      return
    }
    setValue(state => ({
      ...state,
      value: event.target.value
    }))
  }, [active, formActive, value, setValue, validationHandler])
  const reset = useCallback(() => {
    setActive(false)
    setValue(state => ({
      ...state,
      value: '',
      valid: null
    }))
  }, [setValue])
  useEffect(() => {
    !value.reset && setValue(state => ({
      ...state,
      reset
    }))
  }, [value, setValue, reset])
  return {
    showError: (active || formActive) && !value.valid,
    blurHandler,
    inputHandler
  }
}
export default Hook