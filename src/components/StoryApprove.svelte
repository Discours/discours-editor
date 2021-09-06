<script>
import { onMount } from "svelte"
import SvelteTable from "svelte-table"
import { ydoc } from '../stores/room'

let rows = []
const columns = [
    "note",
    "url",
    "from",
    "approved"
]

let statusMessage = ''

onMount(async () => {
    /*
    const response = await fetch('/api/room', {
        method: 'post',
        body: JSON.stringify({ room: window.location.hostname })
    })
    if (response.status === 201) {
        statusMessage = 'Ответ от сервера получен, ждите...'
        rows = await response.json()
    } else {
        statusMessage = 'Что-то пошло не так :(.';
    }
    */
   rows = $ydoc.getArray('stories').toArray()

})
  </script>
  <p>{rows}</p>
  <SvelteTable {columns} {rows} />