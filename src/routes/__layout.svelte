<script lang="ts">
  import '../app.postcss'

  import { p2p, room, ydoc, db } from '../stores/room'
  import { onMount } from 'svelte'

  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  const options = {
    maxConn: 33,
    signaling: [
      // 'wss://signaling.discours.io',
      'wss://y-webrtc-signaling-eu.herokuapp.com',
    ],
  }

  onMount(() => {
    $p2p = new WebrtcProvider($room, $ydoc, options as any)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', () => {
      console.log('content from the database is loaded')
    })
  })
</script>

<slot />
