import classes from './Add.module.css'
import {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchAction as sliceFetchAction} from './../../../redux/pages/quotes/quotes'
import usePagesFetch from './../../../hooks/pages/fetch'
import useUiForm from './../../../hooks/ui/form'
import Input from './../../UI/Input'
const Component = props => {
  const routerNavigateHook = useNavigate()
  const pagesFetchHookOnFinish = useCallback(callbackProps => {
    if(callbackProps.errorMessage) return
    routerNavigateHook(-1)
  }, [routerNavigateHook])
  const [[authorInput, setAuthorInput], [textInput, setTextInput]] = [
    useState({value: '', valid: null}),
    useState({value: '', valid: null})
  ]
  const pagesFetchHook = usePagesFetch({
    sliceFetchAction,
    onFinish: pagesFetchHookOnFinish,
    urlTail: 'index',
    configuration: {
      method: 'post',
      headers: {'Content-Type': 'appplication/json'},
      body: JSON.stringify({
        id: `item_${Math.floor(65536 * Math.random())}`,
        author: authorInput.value,
        text: textInput.value
      })
    },
    actionName: 'add',
    actionSliceTail: 'list',
    sliceTail: 'pagesQuotes'
  })
  const uiFormHook = useUiForm({
    inputs: [authorInput, textInput],
    onSubmit: pagesFetchHook.handler
  })
  const [authorValidationHandler, textValidationHandler] = [
    useCallback(callbackProps => callbackProps.trim() !== '', []),
    useCallback(callbackProps => callbackProps.trim() !== '', [])
  ]
  return <form className={classes.add} onSubmit={uiFormHook.submitHandler}>
    <Input
      formActive={uiFormHook.active}
      validationHandler={authorValidationHandler}
      value={authorInput}
      setValue={setAuthorInput}
      label='author'
      input={{type: 'text', id: 'author'}}
    />
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