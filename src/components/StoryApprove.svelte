<script lang="ts">
  import type { MyStory } from '../stores/story'
  import { ydoc } from '../stores/room'
  import _ from '../utils/localize'

  let rows: MyStory[] = []
  let columns: string[] = []
  const runames = {
    notes: 'Записи',
    sign: 'Подпись',
    room: 'Адрес',
    ts: 'Время',
    peer: 'Peer ID',
  }

  $: if ($ydoc) rows = <MyStory[]>$ydoc.getArray('stories').toArray()
  $: if (rows.length > 0)
    Object.keys(rows[0]).forEach((name) =>
      columns.push(_(runames[name])).toString()
    )
</script>

{#if columns && rows}
  <table>
    <tr class="p-2 labels">
      {#each columns as col}
        <tc>{col}</tc>
      {/each}
    </tr>
    {#each rows as row}
      <tr>
        {#each Object.values(row) as field}
          <tc>{field.toString()}</tc>
        {/each}
      </tr>
    {/each}
  </table>
{/if}
