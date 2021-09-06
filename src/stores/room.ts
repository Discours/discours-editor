import { writable, derived } from 'svelte/store'

import * as Y from 'yjs'

const DEFAULT_ROOM = 'discours.io/demo'
export const connectivity = {
    signaling: [
        // 'wss://signaling.discours.io',
        'wss://y-webrtc-signaling-eu.herokuapp.com',
    ]
}

export const swarm = writable(DEFAULT_ROOM)
export const ydoc = writable(new Y.Doc())
export const provider = writable()
