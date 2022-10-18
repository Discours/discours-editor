import { render } from 'solid-js/web'
import { CreateView } from './components/CreateView'
import { newState } from './components/Editor/store/context'

render(() => <CreateView state={newState()} />, document.getElementById('container'))
