import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export interface MyStory {
  notes: string[]
  room: string
  ts?: string
  peer?: string
  sign?: string
  shared?: boolean
}

export const call: Writable<string> = writable('Подписать')
export const quiz: Writable<string[]> = writable(['Подпись'])
