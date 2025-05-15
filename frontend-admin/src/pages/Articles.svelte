<script>
    import { onMount } from "svelte";
    import { getAllPosts, getPublishedPosts, getUnpublishedPosts } from "../services/api.js";
    import { Link } from "svelte-routing";
    import { formatDate } from "../utils/formatDate.js";
  
    let posts = [];
    
    async function fetchAllPosts() {
      posts = await getAllPosts();
      posts.reverse();
    }
  
    async function fetchPublishedPosts() {
      posts = await getPublishedPosts();
      posts.reverse();
    }
  
    async function fetchUnpublishedPosts() {
      posts = await getUnpublishedPosts();
      posts.reverse();
    }
  
    onMount(() => {
      fetchAllPosts();
    });
  </script>
  
  <main>
    <h1>Articles</h1>
    <ul>
      <li><button on:click={fetchAllPosts}>All Posts</button></li>
      <li><button on:click={fetchPublishedPosts}>Published</button></li>
      <li><button on:click={fetchUnpublishedPosts}>Unpublished</button></li>
    </ul>
    
    {#if posts.length > 0}
      {#each posts as post}
        <article>
          <h2>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          {#if post.published}
            <p>Status: Published</p>
          {:else}
            <p>Status: Unpublished</p>
          {/if}
          <p>Posted at: {formatDate(post.createdAt)}</p>
          {#if post.updatedAt}
            <p>Updated at: {formatDate(post.updatedAt)}</p>
          {/if}
          <p>{post.content}</p>
        </article>
      {/each}
    {:else}
      <p>No articles available. Check back later!</p>
    {/if}
  </main>
  