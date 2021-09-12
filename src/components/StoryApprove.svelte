<script>
  import SvelteTable from 'svelte-table'
  import { ydoc } from '../stores/room'

  let rows = []
  const columns = [ 'room', 'ts', 'notes', 'from', 'sign', 'saved']

  $: if($ydoc) {
    rows = $ydoc.getArray('stories').toArray()
    console.debug(rows)
  }
</script>

<p>{rows}</p>
<SvelteTable {columns} {rows} />
