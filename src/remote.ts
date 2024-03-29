import { appWindow } from '@tauri-apps/api/window'
import { invoke } from '@tauri-apps/api/tauri'
import * as clipboard from '@tauri-apps/api/clipboard'
import * as fs from '@tauri-apps/api/fs'
import * as dialog from '@tauri-apps/api/dialog'
import { EditorState } from 'prosemirror-state'
import { Args } from './store'
import { serialize } from './markdown'
import { isTauri } from './env'

export const getArgs = async (): Promise<Args> => {
  if (!isTauri) throw Error('Must be run in tauri')
  return await invoke('get_args')
}

export const setAlwaysOnTop = (alwaysOnTop: boolean): Promise<void> => {
  if (!isTauri) throw Error('Must be run in tauri')
  return appWindow.setAlwaysOnTop(alwaysOnTop)
}

export const quit = (): Promise<void> => {
  if (!isTauri) throw Error('Must be run in tauri')
  return appWindow.close()
}

export const isFullscreen = (): Promise<boolean> => {
  if (!isTauri) throw Error('Must be run in tauri')
  return appWindow.isFullscreen()
}

export const setFullscreen = (status: boolean): Promise<void> => {
  if (!isTauri) throw Error('Must be run in tauri')
  return appWindow.setFullscreen(status)
}

export const copy = async (text: string): Promise<void> => {
  if (isTauri) {
    return clipboard.writeText(text)
  } else {
    navigator.clipboard.writeText(text)
  }
}

export const copyAllAsMarkdown = async (state: EditorState): Promise<void> => {
  const text = serialize(state)
  if (isTauri) {
    return clipboard.writeText(text)
  } else {
    navigator.clipboard.writeText(text)
  }
}

export const getMimeType = async (path: string): Promise<string> => {
  if (!isTauri) throw Error('Must be run in tauri: getMimeType')
  return invoke('get_mime_type', { path })
}

export const getFileLastModified = async (path: string): Promise<Date> => {
  if (!isTauri) throw Error('Must be run in tauri: getFileLastModified')
  const ts = (await invoke('get_file_last_modified', { path })) as string
  return new Date(ts)
}

export const readFile = async (path: string): Promise<string> => {
  if (!isTauri) throw Error('Must be run in tauri: readFile')
  return fs.readTextFile(path)
}

export const readBinaryFile = async (path: string): Promise<Uint8Array> => {
  if (!isTauri) throw Error('Must be run in tauri: readBinaryFile')
  return fs.readBinaryFile(path)
}

export const writeFile = async (path: string, contents: string): Promise<void> => {
  if (!isTauri) throw Error('Must be run in tauri: writeFile')
  return fs.writeFile({ path, contents })
}

export const resolvePath = async (paths: string[]): Promise<string> => {
  if (!isTauri) throw Error('Must be run in tauri: resolvePath')
  return invoke('resolve_path', { paths })
}

export const dirname = async (path: string): Promise<string> => {
  if (!isTauri) throw Error('Must be run in tauri: dirname')
  return invoke('dirname', { path })
}

export const save = async (state: EditorState): Promise<string> => {
  if (!isTauri) throw Error('Must be run in tauri: save')
  const path = await dialog.save()
  await fs.writeFile({ path, contents: serialize(state) })
  return path
}
