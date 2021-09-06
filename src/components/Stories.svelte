<script lang="ts">
import { onMount } from 'svelte';

import { provider, ydoc, stories } from '../stores/room'

let sss = []

$: if($stories.length) {
    console.debug($stories.toArray())
    sss = $stories.toArray()
}
</script>
<style></style>

<div>
    <div class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin">
        <span><b>Павел</b> <span>6.09.2021</span></span>
        <p class="mt-3 mb-3 mr-5">Сервис должен быть простым, интуитивно понятным; кросс-платформенным; обладать удобными инструментами для продвижения публикаций в социальных медиа; лента должна обновляться в режиме</p>
        <div class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center">
            <p>Поделиться</p>
        </div>
    </div>
    {#each sss as story}
        <div class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin">
            <span><b>Аноним</b> <span>сегодня</span></span>
            <p class="mt-3 mb-3 mr-5">{@html story.note}</p>
            <div class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center">
                <p>Поделиться</p>
            </div>
        </div>
    {/each}
</div>