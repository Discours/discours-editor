<script lang="ts">
  import _ from '../utils/localize'
  import { ydoc } from '../stores/room'
  // import { quiz } from '../stores/story'
  import { stories } from '../stores/user'
  import StoryShare from './StoryShare.svelte'

  let sss = []
  $: sss = $stories.toArray()

  const removeStory = async (story) => {
    console.log('removing a story')
    const index = $stories.toArray().indexOf(story)
    if (index > -1) {
      $ydoc.getArray('stories').delete(index)
      $stories = $ydoc.getArray('stories')
      sss = $stories.toArray()
    }
  }
</script>

<div>
  {#each sss as story, i}
    <div
      class="px-4 py-3 text-sm text-black story"
    >
      <span>
        <b class="border rounded p-1">{story.sign || _('аноним')}</b>
        <span class="text-xs">{(story && story.ts) || _('недавно')}</span>
      </span>
      <span class="righter fadebtn">
        <a href={''} on:click|preventDefault={() => removeStory(story)}>
          [x]
        </a>
      </span>
      {#if story.notes.length > 1}
        {#each story.notes as note}<p class="mt-3 mb-3 mr-5">{note}</p>{/each}
        <StoryShare {story} anchor={'#note-' + i.toString()} />
      {/if}
    </div>
  {/each}
</div>

<style global>
  .righter {
    float: right;
  }
  .fadebtn {
    transition: opacity 0.6s ease-out;
    opacity: 0;
  }
  .story:hover .fadebtn {
    opacity: 1;
  }
</style>
