<script lang="ts">
  import Editor from '../components/Editor/view.svelte'
  import { p2p, ydoc, room, body } from '../store'

  $: if($ydoc && $room) $body = $ydoc.getXmlFragment($room + '-body')
</script>

{#if $p2p && $p2p.awareness}
  <Editor body={$body} awareness={$p2p.awareness} />
{/if}