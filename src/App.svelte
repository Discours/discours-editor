<script context="module">
  import MD from 'markdown-it'
  import footnotePlugin from 'markdown-it-footnote'
  import markPlugin from 'markdown-it-mark'
  // import containerPlugin from 'markdown-it-container'

  const mit = new MD()
    // mit.use(containerPlugin, name [, options])
    .use(footnotePlugin)
    .use(markPlugin)
</script>

<script>
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from 'y-prosemirror'
  import { history } from 'prosemirror-history'
  import { dropCursor } from 'prosemirror-dropcursor'
  import { gapCursor } from 'prosemirror-gapcursor'
  import { keymap } from 'prosemirror-keymap'

  import P2P from './components/P2P.svelte'
  import { roompass } from './store/p2p'
  import { editorState, body } from './store/editor'
  import ProsemirrorEditor from './components/ProsemirrorEditor/component.svelte'
  import { createRichTextEditor } from './components/ProsemirrorEditor/state'
  import { p2p, ydoc } from './store/p2p'
  import { onMount } from 'svelte'

  export let props = {
    placeholder: 'Напишите что-нибудь',
    body: '',
  }

  onMount(async () => {
    const data = $ydoc.getArray('data')
    const aw = $p2p.awareness
    const plugins = [
      history(),
      gapCursor(),
      dropCursor(),
      ySyncPlugin(data),
      yCursorPlugin(aw),
      yUndoPlugin(),
      keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
    ]
    $body = props.body
    $editorState = createRichTextEditor(mit.parse($body, {}), plugins)
  })
</script>

<section class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md">
  <P2P password={$roompass} />
  <ProsemirrorEditor
    placeholder={props.placeholder}
    body={$body}
    editorState={$editorState}
    on:change={(ev) => ($editorState = ev.detail.editorState)}
    debounceChangeEventsInterval={500}
  />
</section>

<style global>
  body {
    background-color: #fafafa;
    color: rgba(38, 38, 38, 0.7);
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  div,
  span {
    margin: 0;
    padding: 0;
  }
</style>
