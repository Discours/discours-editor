<script lang="ts">
  // Design & idea credit: www.vercel.com/docs 🙏
  import { page } from '$app/stores'
  import type { MyStory } from '../stores/room'
  import { p2p, ydoc, stories } from '../stores/room'
  import Stories from '../components/Stories.svelte'

  let binded = false
  let isSubmittedOnce = false
  const parts = ['Для меня эти два дня это...', 'Как вас зовут?']
  let elements = {}

  $: if ($p2p && !binded) {
    $p2p.on('synced', (synced) => {
      // NOTE: This is only called when a different browser connects to this client
      // Windows of the same browser communicate directly with each other
      // Although this behavior might be subject to change.
      // It is better not to expect a synced event when using y-webrtc
      console.log('synced!', synced)
    })
    binded = true
  }

  let notes: { [key: string]: string } = {}

  const submitStory = async () => {
    isSubmittedOnce = true
    // Create a Y.Array in the Y.Doc
    $stories = $ydoc.getArray('stories')
    console.debug($p2p)
    const s: MyStory = {
      parts: Object.values(notes),
      url: $page.host + $page.path,
    }
    $stories.insert($stories.length, [s])
    Object.values(elements).forEach((el: any) => (el.value = ''))
  }
</script>

<div>
  <div class="bg-white rounded-2xl py-8 px-6 m-auto">
    <Stories />
    {#if $p2p}<p>{$p2p.roomName}</p>{/if}
    <form on:submit|preventDefault={submitStory}>
      <div class="mt-6">
        {#each parts as part}
          <div class="w-full">
            <textarea
              bind:this={elements[part]}
              bind:value={notes[part]}
              placeholder={part}
              id="note"
              width="100%"
              aria-label="Ваша история"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              type="text"
              class="w-full p-2 rounded-lg border border-gray-300 resize-none"
            />
          </div>
        {/each}
        <div class="flex justify-end">
          <button
            role="button"
            type="submit"
            disabled={isSubmittedOnce}
            class="px-4 py-2 rounded-lg bg-green text-sm text-white hover:bg-green-light "
            ><span>Отправить</span></button
          >
        </div>
      </div>
    </form>
  </div>
</div>

<style type="text/postcss">
</style>
