import { Show, onCleanup, createEffect, onError, onMount, untrack } from 'solid-js'
import { createMutable, unwrap } from 'solid-js/store'
import { listen } from '@tauri-apps/api/event'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { insertImage } from './prosemirror/extension/image'
import { isTauri } from './env'
import { State, StateContext } from './store'
import { createCtrl } from './store/ctrl'
import * as remote from './remote'
import { Layout } from './components/Layout'
import Editor from './components/Editor'
import Sidebar from './components/Sidebar'
import ErrorView from './components/Error'
import Index from './components/Index'
// import Newnode from './lib/newnode'
import './app.scss'

export default (props: { state: State }) => {
  const [store, ctrl] = createCtrl(props.state)
  const mouseEnterCoords = createMutable({ x: 0, y: 0 })

  const onMouseEnter = (e: any) => {
    mouseEnterCoords.x = e.pageX
    mouseEnterCoords.y = e.pageY
  }

  onMount(async () => {
    if (store.error) return
    await ctrl.init()
  })

  onMount(() => {
    // if(!isTauri) Newnode.start() // TODO: exclude web
    const matchDark = () => window.matchMedia('(prefers-color-scheme: dark)')
    const onChangeTheme = () => {
      ctrl.updateTheme()
    }

    matchDark().addEventListener('change', onChangeTheme)
    onCleanup(() => matchDark().removeEventListener('change', onChangeTheme))
  })

  onMount(async () => {
    if (!isTauri) return
    const unlisten = await listen('tauri://file-drop', async (event: any) => {
      for (const path of event.payload as string[]) {
        const mime = await remote.getMimeType(path)
        if (mime.startsWith('image/')) {
          const x = mouseEnterCoords.x
          const y = mouseEnterCoords.y
          insertImage(store.editorView, convertFileSrc(path), x, y)
        } else if (mime.startsWith('text/')) {
          const state: State = unwrap(store)
          const file = await ctrl.loadFile(state.config, path)
          await ctrl.openFile(file)
          return
        }
      }
    })

    onCleanup(() => unlisten())
  })

  onError((error) => {
    console.error(error)
    ctrl.setState({
      error: { id: 'exception', props: { error } }
    })
  })

  createEffect((prev) => {
    const lastModified = store.lastModified
    if (!lastModified || (store.loading === 'initialized' && prev === 'loading')) {
      return store.loading
    }

    const state: State = untrack(() => unwrap(store))
    ctrl.saveState(state)
    return store.loading
  }, store.loading)

  return (
    <StateContext.Provider value={[store, ctrl]}>
      <Layout
        config={store.config}
        data-testid={store.error ? 'error' : store.loading}
        onMouseEnter={onMouseEnter}
      >
        <Show when={store.error}>
          <ErrorView />
        </Show>
        <Show when={store.loading === 'initialized'}>
          <Index/>
          <Show when={!store.error}>
            <Editor />
          </Show>
          <Sidebar />
        </Show>
      </Layout>
    </StateContext.Provider>
  )
}
