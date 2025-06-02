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
      <p class="note">Loading articles...</p>
    {:else}
      {#if posts.length > 0}
        {#each posts as post}
          <article>
            <h2>
              <a href={`/post/${post.id}`} on:click|preventDefault={() => goto(`/post/${post.id}`)}>
                {post.title}
              </a> 
            </h2>
            <p>Posted at {formatDate(post.createdAt)}{#if post.updatedAt}&nbsp;/ Updated at {formatDate(post.updatedAt)}{/if}</p>
            <p class="content">{post.content}</p>
          </article>
        {/each}
      {:else}
        <p class="note">No articles available. Check back later!</p>
      {/if}
    {/if}
  </main>
  
  <style>
    main {
      max-width: 70vw;
      margin: 2rem auto;
    }
    h1 {
      text-align: center;
      font-size: 2.5rem;
      color: #4D686A;
    }
    article {
      height: 20vh;
      margin-bottom: 2rem;
      padding: 1rem 2rem;
      border: 0.02rem solid #4D686A;
      border-radius: 5px;
      overflow: hidden;
    }
    h2 a {
      color: #4D686A;
      font-size: 2rem;
      text-decoration: none;
    }
    h2 a:hover {
      text-decoration: underline;
    }
    p {
      font-size: 0.8rem;
    }
    p.content {
      font-size: 1rem;
      margin-top: 0.5rem;
    }
    p.note {
      text-align: center;
      font-size: 1.2rem;
      color: #4D686A;
    }
  </style>