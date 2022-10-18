import { Show, onCleanup, createEffect, onError, onMount, untrack } from 'solid-js'
import { createMutable, unwrap } from 'solid-js/store'
import { State, StateContext } from './Editor/store/context'
import { createCtrl } from './Editor/store/actions'
import { Layout } from './Editor/components/Layout'
import { Editor } from './Editor/components/Editor'
import Sidebar from './Editor/components/Sidebar'
import ErrorView from './Editor/components/Error'
import '../styles/app.scss'

export const CreateView = (props: { state: State }) => {
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
    const matchDark = () => window.matchMedia('(prefers-color-scheme: dark)')
    const onChangeTheme = () => {
      ctrl.updateTheme()
    }

    matchDark().addEventListener('change', onChangeTheme)
    onCleanup(() => matchDark().removeEventListener('change', onChangeTheme))
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
          <Show when={!store.error}>
            <Editor />
          </Show>
          <Sidebar />
        </Show>
      </Layout>
    </StateContext.Provider>
  )
}
