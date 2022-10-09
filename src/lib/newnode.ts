import { registerPlugin } from '@capacitor/core'

export interface NewnodePlugin {
  echo(options: { value: string }): Promise<{ value: string }>
  start(): Promise<unknown>
}

const Newnode = registerPlugin<NewnodePlugin>('Newnode')

export default Newnode
