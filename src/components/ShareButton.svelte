<script lang="ts">
    // import { onMount } from 'svelte'
    import _ from '../utils/localize'

    const shareHandler = (event) => {
        event.preventDefault()
        console.log('TODO: sharing a story')
    }
</script>
<div class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center sharebtn">
    <a href={''} on:click={shareHandler}>{_('Поделиться')}</a>
</div>
<style>
    .sharebtn {
      transition: opacity 0.6s ease;
      opacity: 0;
    }
   :global(.story:hover) .sharebtn {
      opacity: 1;
    }
</style>