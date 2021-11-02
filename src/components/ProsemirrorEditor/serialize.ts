import { EditorState } from 'prosemirror-state'
import { DOMSerializer } from 'prosemirror-model'
import { schema } from './schema'

/**
 * Deserialize an editor state from a JSON object
 * @param json JSON representation of the editor state
 * @param schema Related schema (defaults to multiline)
 * @returns {instance|EditorState}
 */
export const fromJSON = (json) => {
  return EditorState.fromJSON({ schema }, json)
}

/**
 * Serialize an editor state to JSON
 * @param editorState {EditorState}
 * @returns Object
 */
export const toJSON = (editorState) => {
  return editorState ? editorState.toJSON() : null
}

/**
 * Converts editor state to an HTML string
 * @param editorState {EditorState}
 * @returns {string}
 */
export const toHTML = (editorState) => {
  const serializer = DOMSerializer.fromSchema(editorState.schema)
  const fragment = serializer.serializeFragment(editorState.doc.content)
  const node = document.createElement('div')
  node.append(fragment)
  return node.innerHTML
}

/**
 * Converts the editor state to plain text
 * @param editorState {EditorState}
 * @return {string}
 */
export const toPlainText = (editorState) => {
  if (editorState.doc.childCount === 0) {
    return ''
  } else if (editorState.doc.childCount === 1) {
    return editorState.doc.textContent
  } else {
    const paragraphs = []
    for (let i = 0; i < editorState.doc.childCount; i++) {
      paragraphs.push(editorState.doc.child(i).textContent)
    }
    return paragraphs.join('\n')
  }
}
