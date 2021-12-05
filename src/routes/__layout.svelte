<script lang="ts">
  import P2P from '../components/P2P.svelte'
  import { webrtc  } from '../store'
  import MD from 'markdown-it'
  import footnotePlugin from 'markdown-it-footnote'
  import markPlugin from 'markdown-it-mark'
  import '../app.css'
  // import containerPlugin from 'markdown-it-container'
  const mit = new MD()
    // mit.use(containerPlugin, name [, options])
    .use(footnotePlugin)
    .use(markPlugin)
</script>

<P2P password={$webrtc.password} />
<slot />