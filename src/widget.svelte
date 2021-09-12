<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // import "../node_modules/tailwindcss/tailwind.css"
  import StoryWidget from './components/StoryWidget.svelte'
  import { ydoc, room, p2p, webrtc } from './stores/room'
  import { lang, db } from './stores/user'
  import { onMount } from 'svelte'
  import _ from './utils/localize'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  const syncedHandler = () => {
    console.log('local database is synced')
    // console.debug($db)
  }

  onMount(() => {
    $lang = 'ru' in window.navigator.languages ? 'ru' : 'en'
    $room = window.location.hostname + window.location.pathname
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', syncedHandler)
    show = false
  })

  let show = false
</script>

<div class="page">
  <div>
    <h2 w-60>{$ydoc.getText($room)}</h2>
    <p>{$ydoc.getText($room + ':subtitle')}</p>
  </div>
  <button
    role="button"
    type="submit"
    on:click={() => (show = true)}
    class:hidden={show}
    class="w-full px-4 py-3 rounded-lg bg-gray hover:bg-gray-light text-sm text-white"
  >
    <span>{_('Поделиться своей историей')}</span>
  </button>
  {#if show}<StoryWidget />{/if}
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
  }

  :global(button) {
    background-color: lightgray;
  }

  .page {
    max-width: 600px;
    margin: auto;
  }

  .page h2 {
    max-width: 60%;
    margin: 25px 0;
    font-size: 26px;
    font-weight: 600;
    line-height: 26px;
  }

  .page p {
    margin: 20px 0;
  }

  .hidden {
    display: none;
  }
</style>
