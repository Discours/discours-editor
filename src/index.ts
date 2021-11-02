import Editor from './Editor.svelte'

const widget = new Editor({
  target: document.body,
  props: (window as any).discours,
})
export default widget
