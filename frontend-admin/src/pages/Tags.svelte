<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "@mateothegreat/svelte5-router";
    import {
      getAllPosts,
      getPublishedPosts,
      getUnpublishedPosts,
      getPostsByTag,
      getPublishedPostsByTag,
      getUnpublishedPostsByTag,
      getAllTags,
      getAllPublishedTags,
      getAllUnpublishedTags
    } from "../services/api";
    import { formatDate } from "../utils/formatDate";
    import type { Post } from "../types/Models";
  
    // 文章與 tag 的資料
    let posts: Post[] = [];
    let tags: string[] = [];
    // 當前選取的 tag，預設無選取
    let selectedTag = "";
    // 當前的發布狀態篩選，預設為 "all"
    let stateFilter = "all"; // 可為 "all", "published", "unpublished"
  
    // 初次讀取全部文章與 tag
    onMount(async () => {
      posts = [...await getAllPosts()];
      tags = [...await getAllTags()];
    });
  
    // 更換發布狀態篩選，
    // 同時根據是否有選取 tag 檢索符合條件的文章與 tag 清單
    async function setStateFilter(filter: string): Promise<void> {
      stateFilter = filter;
      const postFetcher = selectedTag
        ? {
            all: getPostsByTag,
            published: getPublishedPostsByTag,
            unpublished: getUnpublishedPostsByTag,
          }
        : {
            all: getAllPosts,
            published: getPublishedPosts,
            unpublished: getUnpublishedPosts,
          };

      posts = [...await postFetcher[stateFilter](selectedTag || "")];

      const tagFetcher = {
        all: getAllTags,
        published: getAllPublishedTags,
        unpublished: getAllUnpublishedTags,
      };

      tags = [...await tagFetcher[stateFilter]()];
    }
  
    // 點選 tag 時切換：如果點擊的 tag與目前選取的相同，就解除 tag 篩選，
    // 否則就套用該 tag 並依狀態篩選資料
    async function toggleTag(tag: string): Promise<void> {
      selectedTag = selectedTag === tag ? "" : tag;
      await setStateFilter(stateFilter); // ✅ 直接重新載入符合篩選條件的文章
    }
</script>
  
<main>
    <h1>Tags & Posts</h1>
  
    <!-- 發布狀態篩選按鈕 -->
    <div class="state-filters">
      <button on:click={() => setStateFilter("all")} class:selected={stateFilter === "all"}>
        All Posts
      </button>
      <button on:click={() => setStateFilter("published")} class:selected={stateFilter === "published"}>
        Published Posts
      </button>
      <button on:click={() => setStateFilter("unpublished")} class:selected={stateFilter === "unpublished"}>
        Unpublished Posts
      </button>
    </div>
  
    <!-- Tag 清單：點選 tag 本身具有 toggle 功能 -->
    <h2>Tags</h2>
    <ul class="tag-list">
      {#each tags as tag}
        <li>
          <button on:click={() => toggleTag(tag)} class:selected={selectedTag === tag}>
            {tag}
          </button>
        </li>
      {/each}
    </ul>
  
    <!-- 若有 tag 篩選，顯示標題 -->
    {#if selectedTag}
      <h2>Posts with tag: {selectedTag}</h2>
    {/if}
  
    <!-- 文章列表 -->
    {#if posts.length > 0}
      {#each posts as post}
        <article class="post-card">
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
      <p class="note">No posts available.</p>
    {/if}
</main>
  
<style>
  main {
    max-width: 70vw;
    margin: 2rem auto;
  }
  h1, h2 {
    text-align: center;
    font-size: 2.5rem;
    color: #4D686A;
  }
  .state-filters {
    text-align: center;
    margin-bottom: 2rem;
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
  button {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border: 0.02rem solid #D8B283;
    border-radius: 0.2rem;
    cursor: pointer;
    background: #F5F5F4;
    color: #4D686A;
  }
  button:hover {
    background: #D8B283;
  }
  button:focus {
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
  article h2 {
      margin-top: 0;
      text-align: left;
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
  