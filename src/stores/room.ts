import { writable, derived } from 'svelte/store'
import { page } from '$app/stores'
import type { Writable, Readable } from 'svelte/store'
import type { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'

export const room: Readable<string> = derived(
  [page],
  ([$page]) => $page.host + $page.path
)
export const ydoc = writable(new Y.Doc())
export const p2p: Writable<WebrtcProvider> = writable()
