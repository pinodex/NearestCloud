<script>
  import RegionBlock from '@/components/RegionBlock.svelte';
  import { makePinger } from '@/pinger.js';

  export let name;
  export let regions;

  let sortedRegions = [];

  function getComparatorInput(value) {
    return value || Number.MAX_SAFE_INTEGER;
  }

  function sortByLatency() {
    return regions.concat().sort(
      (first, second) => getComparatorInput(first.latency) - getComparatorInput(second.latency));
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

  regions = regions.map((region) => ({
    ...region,
    latency: null
  }));

  const pinger = makePinger(regions);

  pinger.subscribe(({ index, results }) => {
    regions[index].latency = getMedianLatencyFromResults(results);

    sortedRegions = sortByLatency();
  });
</script>

<style lang="sass">
.card-header-title
  justify-content: center
</style>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {name}
    </p>
  </header>

  <div class="card-content">
    {#each sortedRegions as { name, slug, url, latency }}
      <RegionBlock
        name={name}
        slug={slug}
        url={url}
        latency={latency}
      />
    {/each}
  </div>
</div>
