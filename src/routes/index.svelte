<script lang="ts">
  import Editor from '../components/Editor.svelte'
  import P2P from '../components/P2P.svelte'
  import { p2p, roompass, ydoc } from '../store'
  import MD from 'markdown-it'
  import footnotePlugin from 'markdown-it-footnote'
  import markPlugin from 'markdown-it-mark'
  // import containerPlugin from 'markdown-it-container'
  const mit = new MD()
    // mit.use(containerPlugin, name [, options])
    .use(footnotePlugin)
    .use(markPlugin)
</script>

<div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md">
  <P2P password={$roompass} />
  {#if $p2p && $p2p.awareness}
    <Editor ydoc={$ydoc} awareness={$p2p.awareness} />
  {/if}
</div>

<style global>
  div {
    margin: 0;
    padding: 0;
  }
</style>
