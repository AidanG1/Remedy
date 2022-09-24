<script lang="ts">
  import { question_path } from '$lib/Stores/stores';
</script>

<div class="text-sm breadcrumbs">
    <ul>
      {#each $question_path as question}
        <li>
          {question.question}
        </li>
      {/each}
    </ul>
  </div>