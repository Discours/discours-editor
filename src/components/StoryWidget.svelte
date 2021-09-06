<script lang="ts">
	// Design & idea credit: www.vercel.com/docs 🙏
	import { page } from '$app/stores'
	import type { MyStory } from '../stores/room'
	import { provider, ydoc, stories } from '../stores/room'
	import { onMount } from 'svelte'

	let binded = false
	let isSubmittedOnce = false
	const parts = [
		"Что вы узнали, почувствовали и поняли за время хакатона?",
		"Какое самое яркое воспоминание или озарение вы бы хотели увезти из Выборга?",
		"Какое послание из Выборга вы бы отправили себе в будущее?"
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

	const submitStory = async () => {
		isSubmittedOnce = true
		const note = Object.values(notes).join("\n")
		// Create a Y.Array in the Y.Doc
		$stories = $ydoc.getArray('stories')
		console.debug($provider)
		const s: MyStory = {
			note: Object.values(notes).join('\n'),
			url: $page.host + $page.path,
			// from: $provider.
		}
		$stories.push([s])
		/*
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
		*/
	}

onMount(() => {
	const ytext = $ydoc.getText('raw').toString()
})

$: if($provider) {
	resultMessage = $provider.roomName
}
</script>

<div>
	<div class="bg-white rounded-2xl py-8 px-6 m-auto">

		<div class="w-full px-4 py-3 mt-4 mb-4 rounded-lg border bg-white text-sm text-black font-thin">
			<span><b>Павел</b> <span>6.09.2021</span></span>
			<p class="mt-3 mb-3 mr-5">Сервис должен быть простым, интуитивно понятным; кросс-платформенным; обладать удобными инструментами для продвижения публикаций в социальных медиа; лента должна обновляться в режиме</p>
			<div class="mt-6 x-4 py-1 w-20 rounded border border-blue text-xs text-blue text-center">
				<p>Поделиться</p>
			</div>
		</div>

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
							class="px-4 py-2 rounded-lg bg-green text-sm text-white hover:bg-green-light "><span>Отправить</span></button
						>
					</div>
				</div>
		</form>

		
	</div>
</div>

<style type="text/postcss">
</style>
