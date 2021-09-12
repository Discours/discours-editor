<script lang="ts">
    // import { onMount } from 'svelte'
    import _ from '../utils/localize'

    const shareHandler = () => {
        console.log('TODO: sharing a story')
    }
</script>
<div class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center fadebtn">
    <a href={''} on:click|preventDefault={shareHandler}>{_('Поделиться')}</a>
</div>