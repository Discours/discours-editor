<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // import "tailwindcss/tailwind.css"
  import StoryInput from './components/StoryInput.svelte'
  import StoryPreview from './components/StoryPreview.svelte'
  import StoryApprove from './components/StoryApprove.svelte'
  import StoryFormGenerator from './components/StoryFormGenerator.svelte'
  import { ydoc, room, p2p, webrtc } from './stores/room'
  import { lang, db, auth, stories, loading } from './stores/user'
  import { quiz, call } from './stores/story'
  import { onMount } from 'svelte'
  import _ from './utils/localize'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import Tailwind from './tw.svelte'

  export let fields
  export let callToAction

  $: if (fields || callToAction) {
    $quiz = fields
    $call = callToAction
  }

  let showPreview = false

  const synced = () => {
    const up = $ydoc.getArray('stories')
    if ($stories !== up && up.length > 0) {
      $stories = up
      console.log($stories.toArray().length.toString() + ' stories updated')
    }
    $loading = false
  }

  const docUpdate = (update) => {
    console.log('updating doc')
    console.debug(Array.from($ydoc.getArray('stories').toArray()))

    Y.logUpdate(update)
    // console.debug(Array.from($ydoc.getArray('stories').toArray()))
  }

  onMount(() => {
    $lang = window.navigator.languages.indexOf('ru') != -1 ? 'ru' : 'en'
    console.log('language is ' + $lang)
    const subpath = window.location.pathname.length === 1 ? '' : window.location.pathname
    $room = window.location.hostname + subpath
    $auth = document.cookie
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    $db = new IndexeddbPersistence($room, $ydoc)
    $p2p.connect()
    $db.on('synced', synced)
    showPreview = false
    $p2p.doc.on('update', docUpdate)
  })
  let generatorMode = false
  let approveMode = false
</script>

<Tailwind />

<div class="page">

  <header>
    <h2 w-60>{$ydoc.getText($room)}</h2>
    <p>{$ydoc.getText($room + ':subtitle')}</p>
    {#if $p2p}<small>{$p2p.roomName}</small>{/if}
    <a href="#generator" on:click|preventDefault={() => (generatorMode = !generatorMode)}
      >{'🤖'}</a
    >
    <a href="#approve" on:click|preventDefault={() => (approveMode = !approveMode)}
      >{'✍🏻'}</a
    >
  </header>
  {#if !$loading}
    <main>
      {#if approveMode}<StoryApprove />{/if}
      {#if generatorMode}<StoryFormGenerator />{/if}
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
          class="w-half px-4 py-3 text-sm"
        >
          <span>{_($call)}</span>
        </button>
      {/if}
    </footer>
  {/if}
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
  }

  header,
  footer {
    align-items: center;
    text-align: right;
  }

  :global(textarea:focus-visible) {
    border-color: black;
    outline-color: black;
  }

  :global(a),
  :global(button) {
    font-weight: 200;
    color: black !important;
    background-color: white;
    transition: all 0.4s ease;
  }

  :global(a:active),
  :global(button:active) {
    background-color: black;
    border: 1px solid black;
    color: white !important;
  }

  :global(button.disabled) {
    padding: 0;
    margin: 0;
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
