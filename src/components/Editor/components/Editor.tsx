import { EditorView } from 'prosemirror-view'
import { EditorState } from 'prosemirror-state'
import { useState } from '../store/context'
import { ProseMirror } from '../prosemirror/editor'
import '../styles/Editor.scss'

export default () => {
  const [store, ctrl] = useState()
  const onInit = (text: EditorState, editorView: EditorView) => ctrl.setState({ editorView, text })
  const onReconfigure = (text: EditorState) => ctrl.setState({ text })
  const onChange = (text: EditorState) => ctrl.setState({ text, lastModified: new Date() })
  // const editorCss = (config) => css``
  const style = () => (store.error ? `display: none;` : store.markdown ? `white-space: pre-wrap;` : '')
  return (
    <ProseMirror
      className='editor'
      style={style()}
      editorView={store.editorView}
      text={store.text}
      extensions={store.extensions}
      onInit={onInit}
      onReconfigure={onReconfigure}
      onChange={onChange}
    />
  )
}
