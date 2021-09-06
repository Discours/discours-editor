import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'


export interface MyStory {
    note: string
    url: string
    from?: string
    signature?: string
}

const DEFAULT_ROOM = 'discours.io/widget'
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
export const stories = writable(new Y.Array())
