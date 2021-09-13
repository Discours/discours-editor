<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // import "tailwindcss/tailwind.css"
  import StoryInput from './components/StoryInput.svelte'
  import StoryPreview from './components/StoryPreview.svelte'
  import StoryApprove from './components/StoryApprove.svelte'
  import { ydoc, room, p2p, webrtc } from './stores/room'
  import { lang, db, auth, stories, loading } from './stores/user'
  import { quiz, call } from './stores/story'
  import { onMount } from 'svelte'
  import _ from './utils/localize'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import Tailwind from './tw.svelte'

  export let fields
  export let callToAction

  $: if(fields || callToAction) {
      $quiz = fields
      $call = callToAction
  }

  let showPreview = false
  
  const update = () => {
    const up = $ydoc.getArray('stories')
    if($stories !== up && up.length > 0) {
      $stories = up
      console.log($stories.toArray().length.toString() + ' stories updated')
    }
  }

  const syncedHandler = () => {
    console.log('local database is synced')
    // console.debug($db.doc.getArray('stories').toJSON())
    update()
    $loading = false
  }

  onMount(() => {
    $lang = window.navigator.languages.indexOf('ru')!=-1 ? 'ru' : 'en'
    console.log('language is ' + $lang)
    $room = window.location.hostname + (window.location.pathname === '/' ? '' : window.location.pathname)
    $auth = document.cookie
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', syncedHandler)
    showPreview = false
  })
</script>

<div class="page">

  <header>
    <h2 w-60>{$ydoc.getText($room)}</h2>
    <p>{$ydoc.getText($room + ':subtitle')}</p>
    {#if $p2p}<small>{$p2p.roomName}</small>{/if}
  </header>
  {#if !$loading}
  <main>
    <StoryPreview />
  </main>

  <footer>
    {#if showPreview}
      <StoryInput />
    {:else}
      <button
        role="button"
        type="submit"
        on:click={() => (showPreview = true)}
        class:disabled={showPreview}
        class="w-half px-4 py-3 text-sm border border-gray-300"
      >
        <span>{_($call)}</span>
      </button>
    {/if}
  </footer>
  {/if}
</div>
<Tailwind />
<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
  }

  header, footer {
    align-items: center;
    text-align: center;
  }

  :global(textarea:focus-visible) {
    border-color: black;
    outline-color: black;
  }

  :global(a), :global(button) {
    font-weight: 200;
    color: black !important;
    background-color: white;
    transition: all 0.4s ease;
  }

  :global(a:active), :global(button:active) {
    background-color: black;
    border: 1px solid black;
    color: white !important;
  }

  :global(button.disabled) {
    padding: 0; margin: 0;
    border: none !important;
    pointer-events: none;
    height: 0px !important;
    overflow: hidden;
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
</style>
