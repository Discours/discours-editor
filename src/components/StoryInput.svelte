<script lang="ts">
  import _ from '../utils/localize'
  import type { MyStory } from '../stores/story'
  import { quiz } from '../stores/story'
  import { stories, loading } from '../stores/user'
  import { p2p, ydoc, room } from '../stores/room'
  import { onMount } from 'svelte'

  let answers: string[] = []
  let elements: HTMLTextAreaElement[] = []
  let buttonEnabled = false
  let lastTop: number = 0
  let lastHeight: number = 0

$: if (answers[0] && answers[answers.length-1]) {
    if(elements && elements.length > 0 && answers[elements.length-1]) {
      buttonEnabled = answers[elements.length-1].length > 2 && !$loading
    }
  }

  const reset = () => {
    answers = []
    elements.forEach((el: HTMLTextAreaElement) => (el.value = ''))
  }

  const submitStory = () => {
    $loading = true
    console.debug(answers)
    try {
      $stories = $ydoc.getArray('stories')
      const sign = answers.pop()

      const s: MyStory = {
        notes: answers,
        sign,
        room: $room,
        peer: $p2p.room.peerId,
        ts: (new Date()).toJSON().slice(0, 19).replace('T', ' ')
      }

      if(s.sign && s.sign.length > 2) {
        console.log('submitting a story')
        $stories.insert($stories.length, [s])
        $loading = false
      }
      reset()
      return
    } catch(e) {
      console.error(e)
      $loading = false
    }
  }

  onMount(() => {
    elements[0].focus()
    elements.forEach(e => (e as any).webkitSpeech = true)
    // console.log(elements[0])
    const lastElement = elements[$quiz.length-1]
    lastTop = lastElement.offsetTop - 4
    lastHeight = lastElement.offsetHeight
  })
</script>

<div>
  <div class="bg-white py-8 px-6 m-auto">
    <form on:submit|preventDefault={() => submitStory()}>
      <div class="mt-6">
        {#each $quiz as p, i}
          <div class="w-full">
            <textarea
              bind:this={elements[i]}
              bind:value={answers[i]}
              placeholder={_(p)}
              id={'note-' + i.toString()}
              width="100%"
              aria-label={_('Ваша история')}
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              type="text"
              class="w-9/12 py-2 pl-2 left-0 border border-gray-300 resize-none"
              class:pr-22={i===$quiz.length-1}
            />
          </div>
        {/each}
      </div>
    </form>
    <button
      role="button"
      type="submit"
      style={'top:' + lastTop + 'px; height: ' + lastHeight + 'px;'}
      class:showed={buttonEnabled}
      on:click|preventDefault={submitStory}
      class="absolute px-4 py-2 text-sm bottom-0 h-16 right-0 inbtn ">
        {'> ' + _('Отправить')}
    </button>
  </div>
</div>
<style>
  .inbtn {
    pointer-events: none;
    border: none;
    transition: all .7s ease;
    top: 9.4rem;
    opacity: 0;
  }
  .showed {
    opacity: 1 !important;
    pointer-events: all;
  }
</style>