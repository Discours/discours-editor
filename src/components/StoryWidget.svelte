<script lang="ts">
	// Design & idea credit: www.vercel.com/docs 🙏
	import { page } from '$app/stores'
	import { readableText } from 'svelt-yjs'
	import type { Text as YText } from 'yjs'
	import { provider, ydoc } from '../stores/room'
	import { onMount } from 'svelte'

	let binded = false
	let ytextStore
	const parts = [
		"Хотите вискарика?",
		"Как вы относитесь к Кромвелю?",
		"У вас есть хомячок?"
	]

$: if($provider && !binded) {
	
	$provider.on('synced', synced => {
		// NOTE: This is only called when a different browser connects to this client
		// Windows of the same browser communicate directly with each other
		// Although this behavior might be subject to change.
		// It is better not to expect a synced event when using y-webrtc
		console.log('synced!', synced)
	})
	binded = true
}


	let notes: {[key: string]: string } = {}
	let resultMessage = ''
	let isSubmittedOnce = false

	const submitStory = async () => {
		isSubmittedOnce = true
		const note = Object.values(notes).join("\n")
		// Create a Y.Array in the Y.Doc
		const ytext: YText = $ydoc.getText('notes')
		// Generate a Svelte readable store from the Y.Array
		ytextStore = readableText(ytext)
		// The store has a `y` object that references `ytext`
		//       See Yjs docs for other methods on Y.Text.
		ytextStore.y.insert(notes)
		const response = await fetch('/api/create', {
			method: 'post',
			body: JSON.stringify({
				note,
				url: `https://${$page.host + $page.path}`
			})
		});
		if (response.status === 201) {
			resultMessage = 'Благодарим за участие, мы очень ценим это.';
		} else {
			resultMessage = 'Что-то пошло не так :(.';
		}
		setTimeout(() => {
			notes = {}
			resultMessage = ''
		}, 5000)
	}

onMount(() => {
	const ytext = $ydoc.getText('raw').toString()
})

$: if($provider) {
	resultMessage = $provider.roomName
}
</script>

<div>
	<div class="bg-white rounded-2xl max-w-md py-8 px-6 m-auto">
		{#if $provider}
			<p class="text-center">{resultMessage}</p>
			<div class="notes">{ytextStore}</div>
		{/if}
		<form on:submit|preventDefault={submitStory}>
				<div class="mt-6">
					{#each parts as part}
						<div class="w-full">
							<textarea
								bind:value={notes[part]}
								placeholder={part}
								id="note"
								width="100%"
								aria-label="Ваша история"
								autocapitalize="off"
								autocomplete="off"
								autocorrect="off"
								type="text"
								class="w-full p-2 rounded-lg border border-gray-300 resize-none"
							/>
						</div>
					{/each}
					<div class="flex justify-end">
						<button
							role="button"
							type="submit"
							disabled={isSubmittedOnce}
							class="px-4 py-2 rounded-lg bg-black text-sm text-white hover:bg-white hover:text-black hover:border hover:border-black"><span>Отправить</span></button
						>
					</div>
				</div>
		</form>
	</div>
</div>

<style type="text/postcss">
</style>
