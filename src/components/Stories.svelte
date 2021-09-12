<script lang="ts">
  // import { onMount } from 'svelte'
  import _ from '../utils/localize'
  import * as Y from 'yjs'
  import { ydoc } from '../stores/room'
  import { stories } from '../stores/user'
  import ShareButton from '../components/ShareButton.svelte'

  let sss = []
  $: {
    $stories = $ydoc.getArray('stories')
    if ($stories.length) {
      sss = $stories.toArray()
    }
  }

  const removeStory = async (story) => {
    console.log('removing story')
    const index = $stories.toArray().indexOf(story)
    if (index > -1) {
      $ydoc.getArray('stories').delete(index)
      $stories = $ydoc.getArray('stories')
      sss = $stories.toArray()
    }
  }

</script>

<div>
  {#each sss as story}
    <div
      class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin story"
    >
      <span
        ><b>{story.sign || _('аноним')}</b>
        <span>{ story && story.ts || _('недавно')}</span></span
      >
      <span class="righter">
        <a class="fadebtn" href={''} on:click|preventDefault={() => removeStory(story)}> [x] </a>
      </span>
      {#if story.notes.length > 1}
        {#each story.notes as note}<p class="mt-3 mb-3 mr-5">{note}</p>{/each}
        <ShareButton />
      {/if}
    </div>
  {/each}
</div>

<style global>
  .righter {
    float: right;
  }
  .fadebtn {
    transition: opacity 0.6s ease;
    opacity: 0;
  }
 .story:hover .fadebtn {
    opacity: 1;
  }
</style>