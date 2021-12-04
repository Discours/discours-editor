<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  // import { history } from 'prosemirror-history'
  import { dropCursor } from 'prosemirror-dropcursor'
  import { gapCursor } from 'prosemirror-gapcursor'
  import { EditorView } from 'prosemirror-view'
  import { EditorState } from 'prosemirror-state'
  import { schema } from 'prosemirror-markdown'
  import { exampleSetup } from 'prosemirror-example-setup'
  import { keymap } from 'prosemirror-keymap'
  import type { Doc } from 'yjs'
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from 'y-prosemirror'
  import type { Awareness } from 'y-protocols/awareness'

  export let ydoc: Doc = undefined
  export let awareness: Awareness = undefined

  const yXmlFragment = ydoc.getXmlFragment('prosemirror')

  let master: HTMLDivElement = undefined
  let view: EditorView = undefined

  onMount(() => {
    const plugins = [
      // history(),
      gapCursor(),
      dropCursor(),
      ySyncPlugin(yXmlFragment),
      yCursorPlugin(awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ].concat(exampleSetup({ schema }))
    const state = EditorState.create({ schema, plugins })
    view = new EditorView(master, { state })
    view.focus()
  })

  onDestroy(() => view.destroy())
</script>

<div transition:fade bind:this={master} />
