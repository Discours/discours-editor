<script lang="ts">
  import '../app.postcss'

  import { p2p, swarm, ydoc, connectivity, db } from '../stores/room'
  import { onMount } from 'svelte'

  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  onMount(() => {
    $p2p = new WebrtcProvider($swarm, $ydoc, connectivity as any)
    $db = new IndexeddbPersistence($swarm, $ydoc)
    $p2p.connect()
    $db.on('synced', () => {
      console.log('content from the database is loaded')
    })
  })
</script>

<slot />
