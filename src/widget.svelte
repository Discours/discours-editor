<script lang="ts">
  import StoryInput from './components/StoryInput.svelte'
  import StoryPreview from './components/StoryPreview.svelte'
  import { ydoc, room, p2p, webrtc, roompass } from './stores/room'
  import { lang, db, auth, stories, loading } from './stores/user'
  import { call } from './stores/story'
  import { onMount } from 'svelte'
  import _ from './utils/localize'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import generatePassword from './utils/password'
  import StoryApprove from './components/StoryApprove.svelte'

  let showPreview = false

  export let password: string // for the room
  export let caption = _('Подписать')

  let template: HTMLElement

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
    // for widget code
    password = password || generatePassword(33)
    if (password) $roompass = password
    if (caption) $call = caption
    console.log('widget: settings applied')
    // language autoselect
    $lang = window.navigator.languages.indexOf('ru') != -1 ? 'ru' : 'en'
    console.log('widget: language is ' + $lang)
    // room name from window.location
    const subpath =
      window.location.pathname.length === 1 ? '' : window.location.pathname
    $room = window.location.hostname + subpath
    console.log('widget: room is ' + $room)
    // generating personal auth secret
    $auth = document.cookie || (() => {
      console.log('widget: no cookie, apply generated secret')
      document.cookie = generatePassword(33)
      return document.cookie
    })()
    $p2p = new WebrtcProvider($room, $ydoc, $webrtc)
    console.log('widget: p2p is initiated')
    $db = new IndexeddbPersistence($room, $ydoc)
    console.log('widget: local db is initiated')
    $p2p.connect()
    console.log('widget: p2p is connected')
    $db.on('synced', dbSynced)
    showPreview = false
    $p2p.doc.on('update', p2pDocUpdate)
  })

  // $: if($p2p) console.log($p2p)

  let robotSay = ''
  let codeCopied = false
  let saverMode = false

  const handleCopied = () => {
    robotSay = _('Код записан в буфер обмена.')
    codeCopied = true
    setTimeout(() => {
      codeCopied = false
    }, 3000)
  }

  const handleRobot = () => {
    console.log('copying widget code to memory')
    const code = template.innerHTML
    console.debug(code)
    navigator.clipboard.writeText(code).then(handleCopied).catch(console.error)
  }

  const handleSaver = () => {
    saverMode = saverMode!
  }
</script>

<template bind:this={template}>
  <div class="is-discoursio-widget" />
  <srcript>
    {'window.immersive = { password: \"' +
      password + '\", caption: \"' +
      caption + '\" };'}
  </srcript>
  <script src="https://is-discoursio-widget.vercel.app/bundle.js"></script>
</template>

<div class="page">
  <header>
    <span class="talking">
      <small class="tooltip text-xs" class:done={codeCopied}>{robotSay}</small>
      <a href="#coder" on:click|preventDefault={handleRobot}>{'🤖'}</a>
      <a href="#saver" on:click|preventDefault={handleSaver}>{'🔍'}</a>
      {#if $p2p}<small class="p-1 rounded border border-gray-400 room"
          >{$p2p.roomName}</small
        >{/if}
    </span>

    <h2 w-60>{$ydoc.getText($room)}</h2>
    <p>{$ydoc.getText($room + ':subtitle')}</p>
  </header>
  {#if saverMode}<StoryApprove />{:else if !$loading}
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
          class="w-half px-4 py-3 text-sm"
        >
          <span>{_($call)}</span>
        </button>
      {/if}
    </footer>
  {/if}
</div>

<style>
  .room {
    background-color: plum;
    color: white;
    text-shadow: 1px 1px rebeccapurple;
  }
  .tooltip {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
  .tooltip.done {
    opacity: 1;
  }
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
