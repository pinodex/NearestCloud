<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import LoadingSpinner from '@/components/LoadingSpinner.svelte';

  export let name;
  export let slug;
  export let latency = null;
  export let started = false;

  let tagClass = 'is-black';

  $: {
    if (latency <= 100) {
      tagClass = 'is-success';
    } else if (latency <= 500) {
      tagClass = 'is-warning';
    } else {
      tagClass = 'is-danger';
    }
  }
</script>

<div class="level is-mobile">
  <div class="level-left">
    <div>
      <p>{name}</p>
      <p class="is-size-7 has-text-grey">{slug}</p>
    </div>
  </div>

  <div class="level-right">
    {#if started && latency !== null}
      <p>
        <span class={`tag ${tagClass}`}>
          {latency}ms
        </span>
      </p>
    {:else if started}
      <p>
        <LoadingSpinner />
      </p>
    {:else}
      <p>
        ...
      </p>
    {/if}
  </div>
</div>
