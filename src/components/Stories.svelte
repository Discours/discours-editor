<script lang="ts">
  import { onMount } from 'svelte'
  import _ from '../utils/localize'
  import { p2p, ydoc } from '../stores/room'
  import { stories } from '../stores/user'

  let sss = []

  $: $stories = $ydoc.getArray('stories')

  $: if ($stories.length) {
    // console.debug($stories.toArray())
    sss = $stories.toArray()
  }
</script>

<div>
  {#each sss as story}
    <div
      class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin"
    >
      <span
        ><b>{story.sign || _('аноним')}</b>
        <span>{story.timestamp || _('недавно')}</span></span
      >
      {#each story.notes as note}<p class="mt-3 mb-3 mr-5">{note}</p>{/each}
      <div
        class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center"
      >
        <p>{_('Поделиться')}</p>
      </div>
    </div>
  {/each}
</div>

<style></style>
