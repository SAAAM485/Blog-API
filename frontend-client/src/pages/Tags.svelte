<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "@mateothegreat/svelte5-router";
    import {
      getAllPublishedTags,
      getPublishedPosts,
      getPublishedPostsByTag
    } from "../services/api";
    import { formatDate } from "../utils/formatDate";
    import type { Post } from "../types/Models";
  
    let tags: string[] = [];
    let posts: Post[] = [];
    let selectedTag: string = "";
  
    onMount(async () => {
      posts = [...await getPublishedPosts()];
      tags = [...await getAllPublishedTags()];
    });
  
    // 點選 tag 時如果該 tag 已被選取則解除篩選，否則取得該 tag 下的文章
    async function toggleTag(tag: string): Promise<void> {
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
            <a href={`/post/${post.id}`} on:click|preventDefault={() => goto(`/post/${post.id}`)}>
              {post.title}
            </a>
          </h2>
          <p>Posted at {formatDate(post.createdAt)}{#if post.updatedAt}&nbsp;/ Updated at {formatDate(post.updatedAt)}{/if}</p>
          <p class="content">{post.content}</p>
        </article>
      {/each}
    {:else}
      <p class="note">No posts found for this tag.</p>
    {/if}
  </main>
  
  <style>
    main {
      max-width: 70vw;
      margin: 2rem auto;
    }
    ul {
      text-align: center;
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
    button.selected {
      background: #D8B283;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    article h2 {
      margin-top: 0;
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
  