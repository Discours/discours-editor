<script lang="ts">
  import _ from '../utils/localize'
  import * as Y from 'yjs'
  import type { MyStory } from '../stores/story'
  import { stories } from '../stores/user'
  import { p2p, ydoc, room } from '../stores/room'
  import Stories from '../components/Stories.svelte'
  import StoryApprove from '../components/StoryApprove.svelte'
  import { onMount } from 'svelte'

  const defaultOne = ['Ваша подпись']

  export let quiz: string[] = defaultOne

  let binded = false
  let approveMode = false

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

  let answers: { [key: string]: string } = {}
  let elements = []

  const reset = () => {
    answers = {}
    elements = []
    quiz = defaultOne
  }

  const submitStory = async () => {
    console.log('submitting a story')
    try {
      $stories = $ydoc.getArray('stories')
      let notes = Object.values(answers)
      const sign = notes.pop()

      const s: MyStory = {
        notes,
        sign,
        room: $room,
        from: $p2p.room.peerId,
        ts: (new Date()).toJSON().slice(0, 19).replace('T', ' ')
      }

      console.debug(s)

      if(s.sign && s.sign.length > 2) {
        $stories.insert($stories.length, [s])
        Object.values(elements).forEach(
          (el: HTMLTextAreaElement) => (el.value = '')
        )
      }
      reset()
      return
    } catch(e) { console.error(e) }
    
    
  }

  onMount(() => {
    elements[0].focus()
  })
</script>

<div>
  <div class="bg-white rounded-2xl py-8 px-6 m-auto">
    {#if $p2p}<p>{$p2p.roomName}</p>{/if}
    {#if approveMode}<StoryApprove />{:else}<Stories />{/if}
    <form on:submit|preventDefault={() => submitStory()}>
      <div class="mt-6">
        {#each quiz as p, i}
          <div class="w-full">
            <textarea
              bind:this={elements[i]}
              bind:value={answers[p]}
              placeholder={_(p)}
              id={'note-' + i.toString()}
              width="100%"
              aria-label={_('Ваша история')}
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
            class="px-4 py-2 rounded-lg bg-green text-sm text-white hover:bg-green-light "
            ><span>{_('Отправить')}</span></button
          >
        </div>
      </div>
    </form>
  </div>
</div>

<style type="text/postcss">
</style>
