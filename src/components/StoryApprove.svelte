<script>
  import SvelteTable from 'svelte-table'
  import { ydoc } from '../stores/room'

  let rows = []
  let columns = []

  $: if ($ydoc) {
    rows = $ydoc.getArray('stories').toArray()
    if (rows[0]) {
      columns = Object.keys(rows[0])
      columns.push('saved')
      console.debug(columns)
    }
  }
</script>

<p>{rows}</p>
<SvelteTable {columns} {rows} />
