<script lang="ts">
  import '../app.postcss'

  import { p2p, room, ydoc, connectivity, db } from '../stores/room'
  import { onMount } from 'svelte'

  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  onMount(() => {
    $p2p = new WebrtcProvider($room, $ydoc, connectivity as any)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', () => {
      console.log('content from the database is loaded')
    })
  })
</script>

<slot />
