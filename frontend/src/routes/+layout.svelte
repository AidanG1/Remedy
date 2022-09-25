<script lang="ts">
	import '../app.postcss';
	import ThemeChange from '$lib/Components/ThemeChange.svelte';
</script>

<svelte:head>
    <title>Remedy</title>
</svelte:head>

<div class="h-screen">
    <div class="navbar bg-base-100 border border-primary">
        <div class="navbar-start">
            <div class="dropdown">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        /></svg
                    >
                </label>
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><a href="/about">About</a></li>
                    <li><a href="/resources">Resources</a></li>
                </ul>
            </div>
            <a class="btn btn-ghost normal-case text-xl" href="/">Remedy <img src="/logo.png" alt="logo" class="ml-2 w-8"></a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
                <li><a href="/about">About</a></li>
                <li><a href="/resources">Resources</a></li>
            </ul>
        </div>
        <div class="navbar-end">
            <ThemeChange />
            <a class="btn btn-primary" href="https://github.com/AidanG1/HackRice12" target="_blank">Source</a>
        </div>
    </div>
    <slot />
</div>
