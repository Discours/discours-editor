
<script lang="ts">
import { onMount } from 'svelte'
import generatePassword from '../utils/password'
import _ from '../utils/localize'

export let password: string // for the room
export let caption = _('Подписать')

let template: HTMLElement
let robotSay = ''
let done = false

const handleCopied = () => {
    robotSay = _('Код записан в буфер обмена.')
    done = true
    setTimeout(() => done = false, 3000)
}

const handleRobot = () => {
    console.log('copying widget code to memory')
    const code = template.innerHTML
    console.debug(code)
    navigator.clipboard.writeText(code).then(handleCopied).catch(console.error)
}


onMount(() => {
    password = password || generatePassword(33)
})

</script>
<template bind:this={template}>
    <div class="is-discoursio-widget" />
    <srcript>
        {'window.immersive = { password: \"' +
        password + '\", caption: \"' +
        caption + '\" };'}
    </srcript>
    <script src="https://is-discoursio-widget.vercel.app/bundle.js"></script>
</template>

<span class="talking">
    <small class="tooltip text-xs" class:done>{robotSay}</small>
    <a href="#coder" on:click|preventDefault={handleRobot}>{'🤖'}</a>
</span>

<style>
.tooltip {
    opacity: 0;
    transition: opacity 0.5s ease-in;
}
.tooltip.done {
    opacity: 1;
}
</style>