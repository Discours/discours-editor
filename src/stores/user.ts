import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { IndexeddbPersistence } from 'y-indexeddb'
import * as Y from 'yjs'

export const lang: Writable<string> = writable('ru')
export const db: Writable<IndexeddbPersistence> = writable()
export const stories = writable(new Y.Array())
