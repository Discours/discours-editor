<script lang="ts">
import "../app.postcss"
import type { ConnectedPeer } from 'switchboard.js'
import { connection, peers, swarm } from '../stores/network'
import { messages } from '../stores/message'
import type { Message } from '../stores/message'
import { onMount } from 'svelte'

let pids: Set<string> = new Set()

const seenHandler = (peerId: string) => {
    // note: here is always peerId !== $connection.peerID) {
    pids.add(peerId)
}

const peerHandler = async (peer: ConnectedPeer) => {
    console.log(`p2p: ${peer.id} peer handling...`)
    if (!$peers.get(peer.id)) {
        console.log('p2p: new peer appeared!')
    }

    // 1. Message handler

    const msgHandler = async (ev: MessageEvent<any>) => {
        console.log(`p2p: ${peer.id} message handling...`)
        // parse
        const msg: Message = { ...(await JSON.parse(ev.data)) } // TODO: msg sb typed
        // auto fields
        msg.from = peer.id

        // save new message
        $messages.add(msg)
        console.debug(msg)
        console.log(`p2p: ${peer.id} added message`)
    }
    peer.on('message', msgHandler)

    // 2. Stream handler
    /*
    const streamHandler = (stream) => {
        console.log('p2p: ' + peer.id + ' stream handling...')
        const seen = $seens.get(peer.id) || generateSession(peer.id)
        $seens.set(peer.id, <Session>{ ...seen, stream })
        console.log(`p2p: session ${peer.id} was updated with the new stream`)
    }
    peer.on('stream', streamHandler)
    */
    // 3. Binary data handler

    const dataHandler = async (
        raw: string | ArrayBuffer | Blob | ArrayBufferView
    ) => {
        console.log(`p2p: ${peer.id} data handling...`)
        const s = await JSON.parse(raw.toString())
        console.debug(s)
        // $seens.set(s.peerId, s)
        console.log(`p2p: ${peer.id} sent some data`)
    }
    peer.on('data', dataHandler)

    // peer.send(JSON.stringify({ type: 'userdata', session: $mySession }))
    // console.info(`p2p: ${peer.id} got to know you`)

    peer.on('error', console.error)
    peer.once('close', () => $peers.delete(peer.id))
}


onMount(() => {
    $connection.removeAllListeners()
    console.info('p2p: connection listeners were removed')

    $connection.once('connected', () => {
        console.log('p2p: connected!')
        //$connected = $connection.peerID
    })

    $connection.once('kill', () => {
        //$connected = ''
        console.log('p2p: connection killed.')
    })

    $connection.on('peer-error', console.warn)
    $connection.on('warn', console.warn)
    $connection.on('peer-seen', seenHandler)
    $connection.on('peer', peerHandler)

    $swarm = window.location.pathname
    // TODO: filter trustedSwarmes
    // if ($knownSwarms.indexOf(newHash) == -1) $knownSwarms.push(newHash)
    $connection.swarm($swarm)
    console.info(`p2p: swarm #${$swarm}`)
})
</script>
<slot></slot>