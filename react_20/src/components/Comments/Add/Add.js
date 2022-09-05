import classes from './Add.module.css'
import {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchAction as sliceFetchAction} from './../../../redux/pages/comments/comments'
import usePagesFetch from './../../../hooks/pages/fetch'
import useUiForm from './../../../hooks/ui/form'
import Input from './../../UI/Input'
const Component = props => {
  const routerNavigateHook = useNavigate()
  const pagesFetchHookOnFinish = useCallback(callbackProps => {
    if(callbackProps.errorMessage) return
    routerNavigateHook(-1)
  }, [routerNavigateHook])
  const [textInput, setTextInput] = useState({value: '', valid: null})
  const textValidationHandler = useCallback(callbackProps => callbackProps.trim() !== '', [])
  const pagesFetchHook = usePagesFetch({
    sliceFetchAction,
    onFinish: pagesFetchHookOnFinish,
    urlTail: 'index',
    configuration: {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: Math.floor(65536 * Math.random()), text: textInput.value})
    },
    actionName: 'add',
    actionSliceTail: 'list',
    sliceTail: 'pagesComments'
  })
  const uiFormHook = useUiForm({inputs: [textInput], onSubmit: pagesFetchHook.handler})
  return <form className={classes.add} onSubmit={uiFormHook.submitHandler}>
    <Input
      formActive={uiFormHook.active}
      validationHandler={textValidationHandler}
      value={textInput}
      setValue={setTextInput}
      label='text'
      textarea={{id: 'text', rows: '4'}}
    />
    <button type='submit'>
      add
    </button>
  </form>
}
export default Component