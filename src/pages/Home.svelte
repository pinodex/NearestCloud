<script>
  import ProviderPanel from '@/components/ProviderPanel.svelte';
  import providers from '@/providers/index.js';
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
        <button type="button" class="button is-large is-primary">Start Test</button>
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
        />
      </div>
    {/each}
  </div>
</div>
