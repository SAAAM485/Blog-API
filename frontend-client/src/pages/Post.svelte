<script lang="ts">
    import { onMount } from "svelte";
    import { getPostById, getCommentsByPostId, addComment } from "../services/api";
    import type { Post, Comment } from "../types/Models";
    import { formatDate } from "../utils/formatDate";
  
    export let route;
    export let params;
  
    let post: Post | null = null;
    let comments: Comment[] = [];
    let newComment = { author: "", content: "" };
    $: postId = route ? route.result.path.params.id : params.id;
  
    onMount(async () => {
      post = await getPostById(postId);
      console.log("Post:", post);
      comments = [...await getCommentsByPostId(postId)];
    });
  
    async function submitComment(): Promise<void> {
      if (post) {
        await addComment(postId, newComment.author, newComment.content);
        comments = await getCommentsByPostId(postId);
        newComment.author = "";
        newComment.content = "";
      }
    }
</script>
  
<main>
    {#if post}
      <h1>{post.title}</h1>
      <p class="content">{post.content}</p>
      {#if post.tags && post.tags.length > 0}
        <div class="tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      <p>Posted at {formatDate(post.createdAt)}{#if post.updatedAt}&nbsp;/ Updated at {formatDate(post.updatedAt)}{/if}</p>
    {:else}
      <p>Loading post...</p>
    {/if}
    <div class="comments">
      <h2>Comments</h2>
      {#if comments.length > 0}
        <ul>
          {#each comments as comment}
            <li>
              <strong>{comment.author}</strong>
              <span>(Commented at {formatDate(comment.createdAt)})</span>:
              {comment.content}
            </li>
          {/each}
        </ul>
      {:else}
        <p>No comments yet. Be the first to comment!</p>
      {/if}
    </div>
    
    <div class="new_comment">
      <h2>Leave a Comment</h2>
      <input type="text" bind:value={newComment.author} placeholder="Your Name" />
      <textarea bind:value={newComment.content} placeholder="Your Comment"></textarea>
      <button on:click={submitComment}>Submit Comment</button>
    </div>
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
    p {
      width: 50vw;
      justify-self: center;
      font-size: 0.8rem;
      color: #4D686A;
    }
    p.content {
      width: 50vw;
      justify-self: center;
      text-wrap: wrap;
      font-size: 1rem;
      margin-top: 0.5rem;
    }
    .tags {
        width: 50vw;
        justify-self: center;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
    }
    .tag {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      border: 0.02rem solid #D8B283;
      border-radius: 0.2rem;
      cursor: pointer;
      background: #F5F5F4;
      color: #4D686A;
    }
    .comments {
      display: flex;
      flex-direction: column;
      max-width: 50vw;
      margin: 2rem auto;
      font-size: 1rem;
    }
    h2 {
      font-size: 1.5rem;
      color: #4D686A;
    }
    .comments ul {
      list-style: none;
      padding: 0;
      color: #4D686A;
    }
    .comments span{
      font-size: 0.8rem;
      color: #678B8E;
    }
    .new_comment {
      display: flex;
      flex-direction: column;
      max-width: 50vw;
      margin: 2rem auto;
    }
    .new_comment * {
      margin-bottom: 0.5rem;
    }
    .new_comment input, .new_comment textarea {
      width: 100%;
      padding: 0.5rem;
      border: 0.02rem solid #D8B283;
      border-radius: 0.2rem;
    }
    .new_comment button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.2rem;
      background-color: #D8B283;
      color: #F5F5F4;
      cursor: pointer;
    }
</style>
  