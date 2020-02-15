<script>
  import { Router, Route } from 'svelte-routing';

  import Navbar from './components/Navbar.svelte';

  import Home from './pages/Home.svelte';
  import Faq from './pages/Faq.svelte';

  export let url = '/';

  const navbarLinks = [
    {
      to: '/faq',
      text: 'How does this work?'
    }
  ];
</script>

<style lang="sass">
.footer
  margin-top: 5rem
</style>

<Router url="{url}">
  <Navbar
    links={navbarLinks}
  />

  <Route path="/"><Home /></Route>
  <Route path="/faq"><Faq /></Route>
</Router>

<footer class="footer">
  <div class="container has-text-centered">
    <p>
      <span>This website is open-source!</span>
      <a href="https://github.com/pinodex/NearestCloud">Fork it on GitHub</a>
    </p>
  </div>
</footer>
