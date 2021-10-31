import Widget from './widget.svelte'
import type { SvelteComponent } from 'svelte'

const app: SvelteComponent = new Widget({
  target: document.querySelector<HTMLInputElement>('.is-discoursio-widget'),
  props: (window as any).immersive,
})

export default app
