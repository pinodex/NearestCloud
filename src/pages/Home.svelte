<script>
  import ProviderPanel from '@/components/ProviderPanel.svelte';
  import providers from '@/data/index.json';
</script>

<style lang="sass">
.hero
  margin-bottom: 1rem
</style>

<div class="hero is-light">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">NearestCloud</h1>

      <p class="subtitle">Find the region with the lowest latency</p>
    </div>
  </div>
</div>

<div class="container">
  <div class="columns">
    {#each providers as { name }}
      <div class="column">
        <ProviderPanel
          name={name}
        />
      </div>
    {/each}
  </div>
</div>
