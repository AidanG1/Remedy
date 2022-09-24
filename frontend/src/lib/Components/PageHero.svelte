<script lang="ts">
    export let hero_text: string = '';
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">{hero_text}</h1>
            <slot />
        </div>
    </div>
</div>