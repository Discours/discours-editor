import { render } from 'solid-js/web'
import Main from './Main'
import { newState } from './store'

render(() => <Main state={newState()} />, document.getElementById('container'))
