<script lang="ts">
  import { question_path, question_num } from '$lib/Stores/stores';
  import { flow } from '$lib/Flow/flow';
</script>

<div class="text-sm breadcrumbs">
    <ul>
      {#each $question_path as question}
        <li>
          <a on:click={()=>{$question_num = question}}>          
          {flow[question].short}
          </a>
        </li>
      {/each}
    </ul>
  </div>