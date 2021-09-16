import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import type { WebrtcProvider } from 'y-webrtc'
import { Doc } from 'yjs'
import { Awareness } from 'y-protocols/awareness.js'

export const room: Writable<string> = writable('discours.io/widget')
export const ydoc = writable(new Doc())
export const p2p: Writable<WebrtcProvider> = writable()

interface WebrtcOptions {
  signaling: string[]
  password: string | null
  awareness: Awareness
  maxConns: number
  filterBcConns: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peerOpts: any
}

export const signaling = [
  // 'wss://signaling.discours.io',
  // 'wss://stun.l.google.com:19302',
  'wss://y-webrtc-signaling-eu.herokuapp.com',
  'wss://signaling.yjs.dev',
  'wss://tracker.openwebtorrent.com',
]
export const roompass: Writable<string> = writable('')
export const webrtc: Readable<WebrtcOptions> = derived(
  [ydoc, roompass],
  ([$ydoc, $roompass]) => {
    return {
      awareness: new Awareness($ydoc),
      password: $roompass,
      filterBcConns: true,
      maxConns: 33,
      signaling,
      peerOpts: {},
    }
  }
)
