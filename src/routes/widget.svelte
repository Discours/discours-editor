<script lang="ts">
import StoryWidget from '../components/StoryWidget.svelte'

import { ydoc, swarm, provider } from '../stores/room'

</script>
<p>{$provider}</p>
<StoryWidget />