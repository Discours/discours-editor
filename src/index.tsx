import { render } from 'solid-js/web'
import Editor from './components/Editor/components/Editor'
import { newState } from './components/Editor/store/context'

render(() => <Editor state={newState()} />, document.getElementById('container'))
