<script lang="ts">
import StoryWidget from '../components/StoryWidget.svelte'

import { ydoc, swarm } from '../stores/room'

</script>

<style>

body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
}

.page {
    max-width: 600px;
    margin: auto;
}

.page h2 {
    max-width: 60%;
    margin: 25px 0;
    font-size: 26px;
    font-weight: 600;
    line-height: 26px;
}

.page p {
    margin: 20px 0;
}

</style>

<div class="page">
    <div>
        <h2 w-60>Давайте соберём истории на удивительную тему</h2>
        <p>У вас было такое в жизни? Вы или ваши близкие сталкивались с этим? Вы много об этом знаете? Расскажите свою историю.</p>
    </div>

    <StoryWidget />
</div>