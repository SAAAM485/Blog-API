<script lang="ts">
    import { onMount } from "svelte";
    import { getPostById, getCommentsByPostId, addComment } from "../services/api";
    import type { Post, Comment } from "../types/Models";
  
    export let params: { id: string };
  
    let post: Post | null = null;
    let comments: Comment[] = [];
  
    interface NewComment {
      author: string;
      content: string;
    }
    let newComment: NewComment = { author: "", content: "" };
  
    const postId = params.id;
  
    onMount(async () => {
      post = await getPostById(postId);
      comments = [...await getCommentsByPostId(postId)];
    });
  
    async function submitComment(): Promise<void> {
      if (post) {
        await addComment(post.id, newComment.author, newComment.content);
        comments = await getCommentsByPostId(postId);
        newComment.author = "";
        newComment.content = "";
      }
    }
  </script>
  
  <main>
    {#if post}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {#if post.tags.length > 0}
        <div class="tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      <p>Posted at: {formatDate(post.createdAt)}</p>
      {#if post.updatedAt}
          <p>Updated at: {formatDate(post.updatedAt)}</p>
      {/if}
    {:else}
      <p>Loading post...</p>
    {/if}
  
    <h2>Comments</h2>
    {#if comments.length > 0}
      <ul>
        {#each comments as comment (comment.id)}
          <li>
            <strong>{comment.author}</strong>
            <span>(Commented at: {formatDate(comment.createdAt)})</span>:
            {comment.content}
          </li>
        {/each}
      </ul>
    {:else}
      <p>No comments yet. Be the first to comment!</p>
    {/if}
    
    <h3>Leave a Comment</h3>
    <input type="text" bind:value={newComment.author} placeholder="Your Name" />
    <textarea bind:value={newComment.content} placeholder="Your Comment"></textarea>
    <button on:click={submitComment}>Submit</button>
  </main>

  <style>
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 15px;
  }

  .tag {
    background-color: #0073e6;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }

  </style>
  