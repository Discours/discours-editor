/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import App from './widget.svelte'
import type { SvelteComponent } from 'svelte'

const app: SvelteComponent = new App({
  target: document.querySelector<HTMLInputElement>('.is-discoursio-widget'),
})

export default app
