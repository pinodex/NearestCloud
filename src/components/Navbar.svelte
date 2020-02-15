<script>
  import ClickOutside from 'svelte-click-outside';
  import { Link } from 'svelte-routing';

  export let links = [];

  let active = false;
  let menuClasses = ['navbar-menu'];

  $: {
    menuClasses = active ? ['navbar-menu', 'is-active'] : ['navbar-menu'];
  }

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

  function toggle() {
    active = !active;
  }

  function close() {
    active = false;
  }
</script>

<ClickOutside
  on:clickoutside={close}
>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <Link
          to="/"
          getProps={() => ({ class: 'navbar-item' })}
        >
          NearestCloud
        </Link>

        <span
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          on:click={toggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div class={menuClasses.join(' ')}>
        <div class="navbar-start">
          {#each links as { to, text }}
             <Link
              {to}
              {getProps}
              on:click={close}
            >
              {text}
            </Link>
          {/each}
        </div>
      </div>
    </div>
  </nav>
</ClickOutside>
