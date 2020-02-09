<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';

  export let url = '/';

  let navbarLinkProps = () => ({
    class: 'navbar-item'
  });
</script>

<Router url="{url}">
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <p class="navbar-item has-text-weight-semibold">
          NearestCloud
        </p>

        <span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <Link
            to="/"
            getProps={navbarLinkProps}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  </nav>

  <Route path="/"><Home /></Route>
</Router>
