import tauriConf from '../src-tauri/tauri.conf.json'

export const isTauri = (window as any).__TAURI__ !== undefined

export const isDark = () => (window as any).matchMedia('(prefers-color-scheme: dark)').matches

export const isMac =
  window.process?.platform === 'darwin' || window.navigator.platform.indexOf('Mac') !== -1

export const mod = isMac ? 'Cmd' : 'Ctrl'
export const alt = isMac ? 'Cmd' : 'Alt'

export const WEB_URL =
  //'http://localhost:3000'
  'https://discoursio-editor-app.vercel.app'

export const VERSION_URL = `https://github.com/Discours/discours-editor-app/releases/tag/v${tauriConf?.package.version}`
