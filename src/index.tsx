import { render } from 'solid-js/web'
import Main from './Main'
import { newState } from './components/Editor/store/context'

render(() => <Main state={newState()} />, document.getElementById('container'))
