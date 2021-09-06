<script lang="ts">
import "../app.postcss"

import { provider, swarm, ydoc, connectivity } from '../stores/room'
import { onMount } from 'svelte'

import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'

onMount(() => {
    $provider = new WebrtcProvider($swarm, $ydoc, connectivity as any)
    $provider.connect()
})
</script>
<slot></slot>