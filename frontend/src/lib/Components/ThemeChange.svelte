<script lang="ts">
	import { onMount } from 'svelte';
	let theme_options = ['light', 'dark', 'bumblebee', 'halloween', 'dracula', 'autumn', 'forest'];
	let theme_choice: string | null = '';
	let theme_change = (theme: string|null) => {};
	$: {
		theme_change(theme_choice);
	}
	onMount(() => {
		theme_choice = localStorage.getItem('theme');
		if (!theme_choice) {
			theme_choice = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'forest' : 'light';
		}
		theme_change = (theme: string|null) => {
			if (theme) {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
		};
	});
</script>

<select class="select max-w-xs select-bordered mr-1" bind:value={theme_choice}>
	{#each theme_options as theme_option}
		<option value={theme_option}>{theme_option.toLocaleUpperCase()}</option>
	{/each}
</select>

<style>
	option {
		text-transform: capitalize;
	}
</style>