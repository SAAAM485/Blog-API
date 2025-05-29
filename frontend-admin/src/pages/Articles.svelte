<script lang="ts">
    import { onMount } from "svelte";
    import { getAllPosts, getPublishedPosts, getUnpublishedPosts } from "../services/api";
    import { goto } from "@mateothegreat/svelte5-router";
    import { formatDate } from "../utils/formatDate";
    import type { Post } from "../types/Models";
  
    let posts: Post[] = [];
    let loading = true;

    
    async function fetchAllPosts() {
      loading = true;
        try {
          const data = await getAllPosts();
          posts = [...data].reverse();
        } catch (error) {
          console.error("Error fetching all posts:", error);
          posts = []; // ✅ 發生錯誤時回傳空陣列，避免 UI 崩潰
        }
    }

    async function fetchPublishedPosts() {
      loading = true;
      try {
        const data = await getPublishedPosts();
        posts = [...data].reverse();
      } catch (error) {
        console.error("Error fetching published posts:", error);
        posts = []; // ✅ 發生錯誤時回傳空陣列，避免 UI 崩潰
      }
    }

    async function fetchUnpublishedPosts() {
      loading = true;
      try {
        const data = await getUnpublishedPosts();
        posts = [...data].reverse();
      } catch (error) {
        console.error("Error fetching unpublished posts:", error);
        posts = []; // ✅ 發生錯誤時回傳空陣列，避免 UI 崩潰
      }
    }

    onMount(async () => {
        try {
          await fetchAllPosts();
        } finally {
          loading = false; // ✅ 請求結束後關閉 Loading 狀態
        }
    });

  </script>
  
  <main>
    <h1>Articles</h1>
    <ul>
      <li><button on:click={fetchAllPosts}>All Posts</button></li>
      <li><button on:click={fetchPublishedPosts}>Published</button></li>
      <li><button on:click={fetchUnpublishedPosts}>Unpublished</button></li>
      <button on:click={() => goto("/post/create")}>+ Article</button>
    </ul>
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
            {#if post.published === true}
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
    {/if}
  </main>
  