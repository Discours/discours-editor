<script>
	// Design & idea credit: www.vercel.com/docs 🙏
	import { page } from '$app/stores'
	import { provider } from '../stores/room'

	let note = ''
	let resultMessage
	let isSubmittedOnce = false

	const submitFeedback = async () => {
		isSubmittedOnce = true;
		const response = await fetch('/api/create', {
			method: 'post',
			body: JSON.stringify({
				note,
				url: `https://${$page.host + $page.path}`
			})
		});
		if (response.status === 201) {
			resultMessage = 'Thanks for your feedback, we appreciate it.';
		} else {
			resultMessage = 'Oh no, something went wrong :(.';
		}
		setTimeout(() => {
			note = '';
			resultMessage = '';
		}, 5000);
	};
</script>

<div>
	<div class="bg-white rounded-2xl max-w-md py-8 px-6 m-auto">
		{#if $provider}
			<p class="text-center">{$provider && $provider.roomName}</p>
		{/if}
		<form on:submit|preventDefault={submitFeedback}>
				<div class="mt-6">
					<div class="w-full">
						<textarea
							bind:value={note}
							id="note"
							width="100%"
							placeholder="Ваша история"
							aria-label="Ваша история"
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							type="text"
							class="w-full p-2 rounded-lg border border-gray-300 resize-none"
						/>
					</div>
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
