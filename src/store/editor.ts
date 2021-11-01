import { writable, Writable } from 'svelte/store'
import type { EditorState } from 'prosemirror-state'

export const body: Writable<string> = writable('')
export const editorState: Writable<EditorState> = writable()