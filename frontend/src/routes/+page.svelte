<script lang="ts">
    import Breadcrumbs from '$lib/Components/Breadcrumbs.svelte';
    import { flow } from '$lib/Flow/flow';
    import {question_num, question_path } from '$lib/Stores/stores';

    const question_next = (question: number) => {
        $question_num = question;
        $question_path = [...$question_path, question];
    };

    const question_redirect = (url: string) => {
        window.location.href = url;
    };
</script>

<div class="flex">
    <Breadcrumbs />
</div>
<div class="hero min-h-full bg-base-200 w-full">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">{flow[$question_num].question}</h1>
            {#each flow[$question_num].responses as response}
                <button class="btn btn-primary btn-lg m-2" on:click={
                ()=>{'next' in response ? question_next(response.next) : question_redirect(response.page)}
                }>{response.text}</button>
            {/each}
        </div>
    </div>
</div>
