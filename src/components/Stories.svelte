<script lang="ts">
  import { onMount } from 'svelte'

  import { p2p, ydoc, stories } from '../stores/room'

  let sss = []

  $: if ($stories.length) {
    console.debug($stories.toArray())
    sss = $stories.toArray()
  }
</script>

<div>
  <div
    class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin"
  >
    <span><b>Павел</b> <span>6.09.2021</span></span>
    <p class="mt-3 mb-3 mr-5">
      Это были невероятные два дня, которые я никогда не забуду. Случилось всё,
      что я загадывал на стикерах и даже больше — был сумасшедший драйв, кипение
      умов и невероятная радость со-бытия!
    </p>
    <div
      class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center"
    >
      <p>Поделиться</p>
    </div>
  </div>
  {#each sss as story}
    <div
      class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin"
    >
      <span
        ><b>{story.sign || 'аноним'}</b>
        <span>{story.timestamp || 'сегодня'}</span></span
      >
      {#each story.notes as note}<p class="mt-3 mb-3 mr-5">{note}</p>{/each}
      <div
        class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center"
      >
        <p>Поделиться</p>
      </div>
    </div>
  {/each}
</div>

<style></style>
