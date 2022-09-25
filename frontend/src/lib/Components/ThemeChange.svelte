<script lang="ts">
	import { onMount } from 'svelte';
	let theme_options: string[] = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];
	let theme_choice: string | null = '';
	let theme_change = (theme: string|null) => {};
	$: {
		theme_change(theme_choice);
	}
	onMount(() => {
		theme_choice = localStorage.getItem('theme');
		if (!theme_choice) {
			theme_choice = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'black' : 'pastel';
		}
		theme_change = (theme: string|null) => {
			if (theme) {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
		};
	});
</script>

<select class="select max-w-xs select-bordered mr-2 select-secondary hidden md:block" bind:value={theme_choice}>
	{#each theme_options as theme_option}
		<option value={theme_option}>{theme_option.toLocaleUpperCase()}</option>
	{/each}
</select>

<style>
	option {
		text-transform: capitalize;
	}
</style>
