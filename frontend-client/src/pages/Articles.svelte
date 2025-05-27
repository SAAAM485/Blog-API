<script lang="ts">
    import { onMount } from "svelte";
    import { getPublishedPosts } from "../services/api";
    import { goto } from "@mateothegreat/svelte5-router";
    import { formatDate } from "../utils/formatDate";
    import type { Post } from "../types/Models"
  
    let posts: Post[] = [];
    let loading = true;
  
    onMount(async () => {
      try {
        const data = await getPublishedPosts();
        posts = [...data].reverse();
      } finally {
        loading = false; // 請求結束後關閉 Loading 狀態        
      }
    });
  </script>
  
  <main>
    <h1>Articles</h1>
    {#if loading}
      <p>Loading articles...</p>
    {:else}
      {#if posts.length > 0}
        {#each posts as post}
          <article>
            <h2>
              <a href={`/post/${post.id}`} on:click|preventDefault={() => goto(`/post/${post.id}`)}>
                {post.title}
              </a> 
            </h2>
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
    {/if}
  </main>
  