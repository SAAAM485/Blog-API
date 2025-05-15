<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";
    import {
      getAllPublishedTags,
      getPublishedPosts,
      getPublishedPostsByTag
    } from "../services/api.js";
    import { formatDate } from "../utils/formatDate.js";
  
    let tags = [];
    let posts = [];
    let selectedTag = "";
  
    onMount(async () => {
      tags = await getAllPublishedTags();
      posts = await getPublishedPosts();
    });
  
    // 點選 tag 時如果該 tag 已被選取則解除篩選，否則取得該 tag 下的文章
    async function toggleTag(tag) {
      if (selectedTag === tag) {
        selectedTag = "";
        posts = await getPublishedPosts();
      } else {
        selectedTag = tag;
        posts = await getPublishedPostsByTag(tag);
      }
    }
  </script>
  
  <main>
    <h1>Tags</h1>
    
    <!-- Tag 清單，可點選後自行 toggle -->
    <ul>
      {#each tags as tag}
        <li>
          <button on:click={() => toggleTag(tag)} class:selected={selectedTag === tag}>
            {tag}
          </button>
        </li>
      {/each}
    </ul>
  
    {#if selectedTag}
      <h2>Posts with tag: {selectedTag}</h2>
    {/if}
  
    {#if posts.length > 0}
      {#each posts as post}
        <article>
          <h2>
            <Link to={`/post/${post.id}`}>
              {post.title}
            </Link>
          </h2>
          <p>{post.content}</p>
          <p>Posted at: {formatDate(post.createdAt)}</p>
          {#if post.updatedAt}
            <p>Updated at: {formatDate(post.updatedAt)}</p>
          {/if}
        </article>
      {/each}
    {:else}
      <p>No posts found for this tag.</p>
    {/if}
  </main>
  
  <style>
    /* 調整按鈕樣式，當選中的 tag 按鈕會有不同背景 */
    button {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      border: 1px solid #ccc;
      cursor: pointer;
      background: #f5f5f5;
    }
    button.selected {
      background: #ddd;
      border-color: #999;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    article {
      border: 1px solid #eee;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }
    article h2 {
      margin-top: 0;
    }
  </style>
  