<script>
  import RegionBlock from '@/components/RegionBlock.svelte';

  export let name;
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
    <RegionBlock />
    <RegionBlock />
    <RegionBlock />
  </div>
</div>
