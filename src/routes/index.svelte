<script lang="ts">
  import Editor from '../components/Editor.svelte'
  import { p2p, ydoc } from '../store'
</script>

{#if $p2p && $p2p.awareness}
  <Editor ydoc={$ydoc} awareness={$p2p.awareness} />
{/if}