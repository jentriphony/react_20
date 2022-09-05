import { useState, useCallback } from 'react'
const Hook = props => {
  const [active, setActive] = useState(null)
  const {inputs, onSubmit} = props
  const submitHandler = useCallback(event => {
    event.preventDefault()
    for(let iterator = 0; iterator < inputs.length; ++iterator)
      if(!inputs[iterator].valid) {
        !active && setActive(true)
        return
      }
    for(let iterator = 0; iterator < inputs.length; ++iterator)
      inputs[iterator].reset()
    active && setActive(null)
    onSubmit()
  }, [inputs, active, onSubmit])
  return {active, submitHandler}
}
export default Hook