<script lang="ts">
  import { question_path } from '$lib/Stores/stores';
  import { flow } from '$lib/Flow/flow';
</script>

<div class="text-sm breadcrumbs">
    <ul>
      {#each $question_path as question}
        <li>
          {flow[question].question}
        </li>
      {/each}
    </ul>
  </div>