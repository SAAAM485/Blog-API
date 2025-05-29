<script lang="ts">
  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import AboutMe from "./pages/AboutMe.svelte";
  import Articles from "./pages/Articles.svelte";
  import Tags from "./pages/Tags.svelte";
  import Post from "./pages/Post.svelte";

  const routes: RouteConfig[] = [
    { path: "/", component: Home },
    { path: "/about", component: AboutMe },
    { path: "/articles", component: Articles },
    { path: "/tags", component: Tags },
    { path: "/post/(?<id>[^/]+)", component: Post }
  ];
</script>

<main>
  <Header />
  <Router {routes} />
</main>