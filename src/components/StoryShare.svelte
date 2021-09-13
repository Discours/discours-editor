<script lang="ts">
  import _ from '../utils/localize'
  import { room, ydoc } from '../stores/room'
  import { stories } from '../stores/user'
  import type { MyStory } from '../stores/story'

  export let anchor = ''
  export let story: MyStory

  const shareHandler = (story: MyStory) => {
    console.log('sharing a story')
    const i = $stories.toArray().indexOf(story)
    story.shared = true
    $ydoc.getArray('stories').insert(i, [story])
    const link = $room + anchor
    console.log(link)
    // TODO: show modal with link
  }
</script>

<div class="mt-6 x-4 py-1 w-20 border border-gray text-xs text-center fadebtn">
  <a href={''} on:click|preventDefault={() => shareHandler(story)}
    >{_('Поделиться')}</a
  >
</div>
