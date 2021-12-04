import * as Y from 'yjs'
import type { WebrtcProvider } from 'y-webrtc'
import type { IndexeddbPersistence } from 'y-indexeddb'
import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { Doc } from 'yjs'
import { Awareness } from 'y-protocols/awareness.js'

export const body: Writable<string> = writable('')
export const room: Writable<string> = writable('discours')
export const ydoc = writable(new Doc())
export const p2p: Writable<WebrtcProvider> = writable()

interface WebrtcOptions {
  signaling: string[]
  awareness: Awareness
  maxConns: number
  filterBcConns: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peerOpts: any
  password: string
}

export const signaling = [
  // 'wss://signaling.discours.io',
  // 'wss://stun.l.google.com:19302',
  'wss://y-webrtc-signaling-eu.herokuapp.com',
  'wss://signaling.yjs.dev',
]
export const roompass: Writable<string> = writable('')
export const webrtc: Readable<WebrtcOptions> = derived(
  [ydoc, roompass],
  ([$ydoc, $roompass]): WebrtcOptions => {
    return {
      awareness: new Awareness($ydoc),
      filterBcConns: true,
      maxConns: 33,
      signaling,
      peerOpts: {},
      password: $roompass || '',
    }
  }
)
export const data: Writable<Y.Array<unknown>> = writable(new Y.Array())
export const db: Writable<IndexeddbPersistence> = writable()
export const loading: Writable<boolean> = writable(false)
