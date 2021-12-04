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

<div class="editor" transition:fade bind:this={master} />

<style global>
.ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    outline: none;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid #8cf;
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
      border: 2px solid #8cf;
      pointer-events: none;
    }
  
    .ProseMirror .empty-node::before {
      position: absolute;
      color: #aaa;
      cursor: text;
    }
  
    .ProseMirror .empty-node:hover::before {
      color: #777;
    }
  
    .ProseMirror.editor_empty::before {
      position: absolute;
      content: attr(data-placeholder);
      pointer-events: none;
      color: var(--ui-color-placeholder);
    }
  div.editor {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px lightgray solid;
      border-radius: 3px;
  }
</style>