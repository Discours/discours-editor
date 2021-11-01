import App from './App.svelte'

const app = new App({ target: document.body, props: (window as any).discours })
export default app
