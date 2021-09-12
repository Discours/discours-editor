<script lang="ts">
  import '../app.postcss'
  import { lang, db } from '../stores/user'
  import { p2p, room, ydoc } from '../stores/room'
  import { onMount } from 'svelte'

  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  const options = {
    maxConn: 33,
    signaling: [
      // 'wss://signaling.discours.io',
      // 'wss://stun.l.google.com:19302',
      'wss://y-webrtc-signaling-eu.herokuapp.com',
      'wss://signaling.yjs.dev'
    ],
  }

  const syncedHandler = () => {
      console.log('local database is synced')
      // console.debug($db)
    }

  onMount(() => {
    $lang = 'ru' in window.navigator.languages ? 'ru' : 'en'
    $p2p = new WebrtcProvider($room, $ydoc, options as any)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', syncedHandler)
  })
</script>

<slot />
