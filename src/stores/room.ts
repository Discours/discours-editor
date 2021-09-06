import { writable, derived, Writable } from 'svelte/store'
import type { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'

const DEFAULT_ROOM = 'discours/widget'
export const connectivity = {
    maxConn: 33,
    signaling: [
        // 'wss://signaling.discours.io',
        'wss://y-webrtc-signaling-eu.herokuapp.com',
    ]
}

export const swarm = writable(DEFAULT_ROOM)
export const ydoc = writable(new Y.Doc())
export const provider: Writable<WebrtcProvider> = writable()
