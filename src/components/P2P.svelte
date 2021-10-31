<script lang="ts">
  import { onMount } from 'svelte'
  import { db, stories, loading } from '../stores/user'
  import { ydoc, room, p2p, webrtc, roompass } from '../stores/room'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  export let password: string

  const dbSynced = () => {
    const up = $db.doc.getArray('stories')
    if ($stories !== up && up.length > 0) {
      $stories = up
      console.log($stories.toArray().length.toString() + ' stories updated')
    }
    $loading = false
  }

  const p2pDocUpdate = (update) => {
    console.log('widget: updating the doc from p2p')
    console.debug(Array.from($ydoc.getArray('stories').toArray()))
    Y.logUpdate(update)
    console.debug(Array.from($ydoc.getArray('stories').toArray()))
  }

  onMount(() => {
    // room name from window.location
    $room = window.location.hostname + (window.location.pathname.length === 1 ? '' : window.location.pathname)
    console.log('widget: room is ' + $room)

    // check if there is a pre-configured password
    if (password) $roompass = password

    // init p2p provider
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    console.log('widget: p2p is initiated')

    // init db
    $db = new IndexeddbPersistence($room, $ydoc)
    console.log('widget: local db is initiated')

    // connect p2p
    $p2p.connect()
    console.log('widget: p2p is connected')

    // sync db
    $db.on('synced', dbSynced)
    $p2p.doc.on('update', p2pDocUpdate)
  })
</script>

{#if $p2p}
  <small class="p-1 rounded border border-gray-400 room">
    {$p2p.roomName}
  </small>
{/if}

<style>

.room {
    background-color: plum;
    color: white;
    text-shadow: 1px 1px rebeccapurple;
  }
</style>
