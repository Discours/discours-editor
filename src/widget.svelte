<script lang="ts">
  import StoryInput from './components/StoryInput.svelte'
  import StoryPreview from './components/StoryPreview.svelte'
  import P2P from './components/P2P.svelte'
  import CodeRobot from './components/CodeRobot.svelte'
  import { ydoc, room } from './stores/room'
  import { lang, auth, loading } from './stores/user'
  import { call } from './stores/story'
  import { onMount } from 'svelte'
  import _ from './utils/localize'
  import generatePassword from './utils/password'
  import StoryApprove from './components/StoryApprove.svelte'

  let showPreview = false
  let saverMode = false

  export let password: string // for the room
  export let caption = _('Подписать')

  onMount(() => {
    if (caption) $call = caption
    console.log('widget: settings applied')

    // language autoselect
    $lang = window.navigator.languages.indexOf('ru') != -1 ? 'ru' : 'en'
    console.log('widget: language is ' + $lang)

    // generating personal auth secret
    $auth = document.cookie || (() => {
      console.log('widget: no cookie, apply generated secret')
      document.cookie = generatePassword(33)
      return document.cookie
    })()
  })
</script>

<div class="page">
  <header>
    <CodeRobot {password} {caption} />
    <a href="#saver" on:click|preventDefault={() => { saverMode = !saverMode }}>{'🔍'}</a>
    <P2P {password} />
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
