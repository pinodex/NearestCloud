<script>
  import ProviderPanel from '@/components/ProviderPanel.svelte';
  import providers from '@/providers/index.js';

  let startedCount = 0;
  let completedCount = 0;
  let resetCount = 0;

  let allStarted = false;
  let allCompleted = false;
  let allReset = false;

  function start() {
    window.dispatchEvent(new CustomEvent('pingStart'));
  }

  function reset(dispatch = true) {
    startedCount = 0;
    completedCount = 0;
    resetCount = 0;

    if (dispatch) {
      window.dispatchEvent(new CustomEvent('pingReset'));
    }
  }

  function onStart() {
    startedCount += 1;
  }

  function onComplete() {
    completedCount += 1;
  }

  function onReset() {
    resetCount += 1;

    if (resetCount === providers.length) {
      reset(false);
    }
  }

  $: {
    allStarted = providers.length === startedCount;
    allCompleted = providers.length === completedCount;
  }
</script>

<style lang="sass">
.hero
  margin-bottom: 5rem
</style>

<div class="hero is-light">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">NearestCloud</h1>

      <p class="subtitle">Find the region with the lowest latency</p>

      <div class="field">
        {#if allCompleted}
          <button
            type="button"
            class="button is-large is-primary"
            on:click={reset}
          >
            Reset Test
          </button>
        {:else}
          <button
            type="button"
            class="button is-large is-primary"
            disabled={allStarted}
            on:click={start}
          >
            Start All
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="columns">
    {#each providers as { name, regions }}
      <div class="column">
        <ProviderPanel
          name={name}
          regions={regions}
          on:complete={onComplete}
          on:start={onStart}
          on:reset={onReset}
        />
      </div>
    {/each}
  </div>
</div>
