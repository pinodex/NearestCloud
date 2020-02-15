<script>
  import { Link } from 'svelte-routing';

  export let links = [];

  function getProps({ href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    const classes = ['navbar-item'];

    if (isActive) {
      classes.push('is-active');
    }

    return {
      class: classes.join(' ')
    }
  }
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <Link
        to="/"
        {getProps}
      >
        NearestCloud
      </Link>

      <span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </span>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        {#each links as { to, text }}
           <Link
            {to}
            {getProps}
          >
            {text}
          </Link>
        {/each}
      </div>
    </div>
  </div>
</nav>
