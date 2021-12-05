<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import './custom.css'
  import { EditorView } from 'prosemirror-view'
  import { EditorState } from 'prosemirror-state'
  import { schema } from 'prosemirror-markdown'
  import { setup } from './setup'
  import { keymap } from 'prosemirror-keymap'
  import type { XmlFragment } from 'yjs'
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from 'y-prosemirror'
  import type { Awareness } from 'y-protocols/awareness'

  export let awareness: Awareness = undefined
  export let body: XmlFragment

  let element: HTMLDivElement = undefined
  let view: EditorView = undefined

  onMount(() => {
    const plugins = [
      ySyncPlugin(body),
      yCursorPlugin(awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ].concat(setup({ schema }))
    const state = EditorState.create({ schema, plugins })
    view = new EditorView(element, { state })
    view.focus()
    document.querySelector('.ProseMirror-menubar').setAttribute('style', '')
  })

  onDestroy(() => view.destroy())
</script>

<div class="editor" transition:fade bind:this={element} />

<style global>

  a {
    color: rgb(0, 100, 200);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: rgb(0, 80, 160);
  }

  label {
    display: block;
  }

  input,
  button,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  input:disabled {
    color: #ccc;
  }

  button {
    color: #333;
    background-color: #f4f4f4;
    outline: none;
  }

  button:disabled {
    color: #999;
  }

  button:not(:disabled):active {
    background-color: #ddd;
  }

  button:focus {
    border-color: #666;
  }

  .editor {
    justify-content: left;
    align-items: left;
  }
  
</style>
