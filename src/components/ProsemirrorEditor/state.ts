import { EditorState, TextSelection } from 'prosemirror-state'
import { DOMParser } from 'prosemirror-model'
import { schema } from './schema'
/**
 * Parses an html string to create a document from it
 * @param schema {Schema}
 * @param html {string}
 * @returns {Document}
 */
const createDocumentFromHtml = (html) => {
  const parser = DOMParser.fromSchema(schema)
  const node = document.createElement('div')
  node.innerHTML = html
  return parser.parse(node)
}

/**
 * Create an empty editor state with rich text editing capabilities
 * @param html {string}
 * @return {EditorState}
 */
export const createRichTextEditor = (html = '', plugins) => {
  let doc, selection

  if (html) {
    doc = createDocumentFromHtml(html)
    selection = TextSelection.atEnd(doc)
  }

  return EditorState.create({
    schema,
    doc,
    selection,
    plugins,
  })
}

export * from './serialize'
export * from './transform'
