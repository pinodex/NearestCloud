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

<Router url="{url}">
  <Navbar
    links={navbarLinks}
  />

  <Route path="/"><Home /></Route>
  <Route path="/faq"><Faq /></Route>
</Router>
