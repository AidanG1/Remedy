<script lang="ts">
    import { flow } from '$lib/Flow/flow';

    let question_num: number = 0;
</script>

<div class="hero min-h-full bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">{flow[question_num].question}</h1>
            {#each flow[question_num].responses as response}
                <button class="btn btn-primary btn-lg m-2" on:click={()=>{question_num = response.next}}>{response.text}</button>
            {/each}
        </div>
    </div>
</div>
