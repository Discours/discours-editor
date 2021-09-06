import { derived, writable, Writable, Readable } from 'svelte/store'
import type {
  ConnectedPeer,
  SBClientOptions,
  Switchboard as SBType,
} from 'switchboard.js'
import { Switchboard } from 'switchboard.js'

export const options: SBClientOptions = {
  trackers: [
    // 'wss://tracker.dplayer.club',
    // 'wss://tracker.sloppyta.co:443/announce',
    'wss://tracker.files.fm:7073/announce',
    //'wss://tracker.novage.com.ua',
    'wss://tracker.openwebtorrent.com',
  ],
}

export const connection: Writable<SBType> = writable(new Switchboard(options))
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const peers: Writable<Map<string, ConnectedPeer>> = writable(new Map())
export const seens: Writable<Array<any>> = writable([])
export const connected: Readable<string> = derived(
  [connection],
  ([$connection]) => $connection && $connection.peerID
)

export const swarm: Writable<string> = writable('')