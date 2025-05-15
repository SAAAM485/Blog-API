<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";
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
    } from "../services/api.js";
    import { formatDate } from "../utils/formatDate.js";
  
    // 文章與 tag 的資料
    let posts = [];
    let tags = [];
    // 當前選取的 tag，預設無選取
    let selectedTag = "";
    // 當前的發布狀態篩選，預設為 "all"
    let stateFilter = "all"; // 可為 "all", "published", "unpublished"
  
    // 初次讀取全部文章與 tag
    onMount(async () => {
      posts = await getAllPosts();
      tags = await getAllTags();
    });
  
    // 更換發布狀態篩選，
    // 同時根據是否有選取 tag 檢索符合條件的文章與 tag 清單
    async function setStateFilter(filter) {
      stateFilter = filter;
      if (selectedTag) {
        // 依據狀態篩選，重新取得該 tag 下符合條件的文章
        if (stateFilter === "all") {
          posts = await getPostsByTag(selectedTag);
        } else if (stateFilter === "published") {
          posts = await getPublishedPostsByTag(selectedTag);
        } else if (stateFilter === "unpublished") {
          posts = await getUnpublishedPostsByTag(selectedTag);
        }
      } else {
        // 沒有 tag 篩選時，根據狀態取得全部文章
        if (stateFilter === "all") {
          posts = await getAllPosts();
        } else if (stateFilter === "published") {
          posts = await getPublishedPosts();
        } else if (stateFilter === "unpublished") {
          posts = await getUnpublishedPosts();
        }
      }
  
      // 更新 tag 清單也依據狀態
      if (stateFilter === "all") {
        tags = await getAllTags();
      } else if (stateFilter === "published") {
        tags = await getAllPublishedTags();
      } else if (stateFilter === "unpublished") {
        tags = await getAllUnpublishedTags();
      }
    }
  
    // 點選 tag 時切換：如果點擊的 tag與目前選取的相同，就解除 tag 篩選，
    // 否則就套用該 tag 並依狀態篩選資料
    async function toggleTag(tag) {
      if (selectedTag === tag) {
        // 解除 tag 篩選
        selectedTag = "";
        if (stateFilter === "all") {
          posts = await getAllPosts();
        } else if (stateFilter === "published") {
          posts = await getPublishedPosts();
        } else if (stateFilter === "unpublished") {
          posts = await getUnpublishedPosts();
        }
      } else {
        // 選取該 tag
        selectedTag = tag;
        if (stateFilter === "all") {
          posts = await getPostsByTag(tag);
        } else if (stateFilter === "published") {
          posts = await getPublishedPostsByTag(tag);
        } else if (stateFilter === "unpublished") {
          posts = await getUnpublishedPostsByTag(tag);
        }
      }
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
      <p>No posts available.</p>
    {/if}
  </main>
  
  <style>
    .state-filters button,
    .tag-list button {
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    button.selected {
      background-color: #ddd;
      border: 1px solid #999;
    }
    .post-card {
      border: 1px solid #eee;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }
    .post-card h2 {
      margin-top: 0;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    .tag-list li {
      display: inline-block;
      margin-right: 1rem;
    }
  </style>
  