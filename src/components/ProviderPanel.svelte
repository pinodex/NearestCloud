<script>
  import { createEventDispatcher } from 'svelte';
  import { makePinger } from '@/pinger.js';
  import RegionBlock from '@/components/RegionBlock.svelte';

  export let name;
  export let regions;

  const dispatch = createEventDispatcher();

  let sortedRegions = [];
  let started = false;
  let completed = false;

  function buildRegions() {
    regions = regions.map((region) => {
      region.latency = null;

      return region;
    });
  }

  function getComparatorInput(value) {
    return value || Number.MAX_SAFE_INTEGER;
  }

  function getMedianLatencyFromResults(results) {
    const latencies = results
      .map(({ latency }) => latency)
      .sort((first, second) => first - second);

    const middle = Math.floor(latencies.length / 2);

    if (latencies.length % 2 === 0) {
        return (latencies[middle - 1] + latencies[middle]) / 2;
    }

    return latencies[middle];
  }

  function start() {
    if (started || completed) {
      return;
    }

    started = true;

    dispatch('start');

    const pinger = makePinger(regions);

    const onNext = ({ index, results }) => {
      regions[index].latency = getMedianLatencyFromResults(results);
    };

    const onError = () => {
      dispatch('error');
    };

    const onComplete = () => {
      completed = true;

      dispatch('complete');
    }

    pinger.subscribe(onNext, onError, onComplete);
  }

  function reset() {
    started = false;

    completed = false;

    buildRegions();

    dispatch('reset');
  }

  $: {
    sortedRegions = regions.concat().sort(
      (first, second) => getComparatorInput(first.latency) - getComparatorInput(second.latency)
    );
  }

  reset();
</script>

<svelte:window on:pingStart={start} on:pingReset={reset} />

<style lang="sass">
.card-header-title
  justify-content: center

.field
  margin-bottom: 1rem
</style>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {name}
    </p>
  </header>

  <div class="card-content">
    <div class="field">
      {#if completed}
        <button
          class="button is-fullwidth"
          on:click={reset}
        >
          Reset Test
        </button>
      {:else}
        <button
          class="button is-fullwidth"
          disabled={started}
          on:click={start}
        >
          Start Test
        </button>
      {/if}
    </div>

    {#each sortedRegions as { name, slug, latency }}
      <RegionBlock
        name={name}
        slug={slug}
        latency={latency}
        started={started}
      />
    {/each}
  </div>
</div>
