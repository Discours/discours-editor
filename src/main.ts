/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Widget from './widget.svelte'
import type { SvelteComponent } from 'svelte'

const app: SvelteComponent = new Widget({
  target: document.querySelector<HTMLInputElement>('.is-discoursio-widget'),
  props: (window as any).immersive,
})

export default app
