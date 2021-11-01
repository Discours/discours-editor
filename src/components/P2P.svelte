<script lang="ts">
  import { onMount } from 'svelte'
  import {
    db,
    data,
    loading,
    ydoc,
    room,
    p2p,
    webrtc,
    roompass,
  } from '../store/p2p'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  export let password: string

  const dbSynced = () => {
    const up = $db.doc.getArray('data')
    if ($data !== up && up.length > 0) {
      $data = up
      console.log($data.toArray().length.toString() + ' stories updated')
    }
    $loading = false
  }

  const p2pDocUpdate = (update) => {
    console.log('p2p: updating the doc')
    console.debug(Array.from($ydoc.getArray('data').toArray()))
    Y.logUpdate(update)
    console.debug(Array.from($ydoc.getArray('data').toArray()))
  }

  onMount(() => {
    // room name from window.location
    $room =
      window.location.hostname +
      (window.location.pathname.length === 1 ? '' : window.location.pathname)
    console.log('p2p: room is ' + $room)

    // check if there is a pre-configured password
    if (password) $roompass = password

    // init p2p provider
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    console.log('p2p: webrtc provider initialized')

    // init db
    $db = new IndexeddbPersistence($room, $ydoc)
    console.log('p2p: indexed db persistence connected')

    // connect p2p
    $p2p.connect()
    console.log('p2p: connected')

    // sync db
    $db.on('synced', dbSynced)
    $p2p.doc.on('update', p2pDocUpdate)
  })
</script>

{#if $p2p && $p2p.room}
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
