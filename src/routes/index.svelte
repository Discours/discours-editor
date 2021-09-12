<script lang="ts">
import StoryWidget from '../components/StoryWidget.svelte'
import { ydoc, room, p2p } from '../stores/room'
import _ from '../utils/localize'

let show = false
</script>
{#if false}<slot></slot>{/if}
<div class="page">
  <div>
    <h2 w-60>{$ydoc.getText($room)}</h2>
    <p>{$ydoc.getText($room + ':subtitle')}</p>
  </div>
  <button
    role="button"
    type="submit"
    on:click={() => {
      show = true
    }}
    class:hidden={show}
    class="w-full px-4 py-3 rounded-lg bg-gray hover:bg-gray-light text-sm text-white"
    ><span>{_('Поделиться своей историей')}</span></button
  >
  {#if show}<StoryWidget />{/if}
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
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
