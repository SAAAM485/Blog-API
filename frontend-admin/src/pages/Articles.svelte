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
            {#if post.published === true}
              <p>Status: Published</p>
            {:else}
              <p>Status: Unpublished</p>
            {/if}
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
  ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  ul li {
    list-style: none;
  }
  ul button {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border: 0.02rem solid #D8B283;
    border-radius: 0.2rem;
    cursor: pointer;
    background: #F5F5F4;
    color: #4D686A;
  }
  ul button:hover {
    background: #D8B283;
  }
  ul button:focus {
    outline: none;
    box-shadow: 0 0 0.2rem #D8B283;
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
  