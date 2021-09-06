import { Writable, writable } from 'svelte/store'
 
export interface Message {
    note: string
    url: string
    from?: string // peer id
}

export const messages: Writable<Set<Message>> = writable(new Set())