import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { WebrtcProvider } from 'y-webrtc'
import type { IndexeddbPersistence } from 'y-indexeddb'
import * as Y from 'yjs'

export interface MyStory {
  parts: string[]
  url: string
  from?: string
  signature?: string
}

const DEFAULT_ROOM = 'discours.io/widget'
export const room = writable(DEFAULT_ROOM)
export const ydoc = writable(new Y.Doc())
export const p2p: Writable<WebrtcProvider> = writable()
export const db: Writable<IndexeddbPersistence> = writable()
export const stories = writable(new Y.Array())
