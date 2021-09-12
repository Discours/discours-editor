<script>
  import { onMount } from 'svelte'
  import SvelteTable from 'svelte-table'
  import { ydoc } from '../stores/room'

  let rows = []
  const columns = ['note', 'url', 'from', 'approved']

  let statusMessage = ''

$: rows = $ydoc.getArray('stories').toArray()

</script>

<p>{rows}</p>
<SvelteTable {columns} {rows} />
