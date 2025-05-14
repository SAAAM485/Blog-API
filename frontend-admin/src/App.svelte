<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import AboutMe from "./pages/AboutMe.svelte";
  import Articles from "./pages/Articles.svelte";
  import Tags from "./pages/Tags.svelte";
  import Post from "./pages/Post.svelte"; 
  import Login from "./pages/Login.svelte";
  import { userStore } from "./stores/userStore";
</script>

{#if $userStore.isLoggedIn}
  <Header />
  <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutMe} />
      <Route path="/articles" component={Articles} />
      <Route path="/tags" component={Tags} />
      <Route path="/post/:id" component={Post} />
  </Router>
{:else}
  <Login />
{/if}
