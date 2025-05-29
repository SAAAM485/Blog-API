<script lang="ts">
  import { onMount } from "svelte";
  import { 
    getAllPostById, 
    getCommentsByPostId,
    publishPost,
    hidePost,
    addComment, 
    updatePost,
    deletePost 
  } from "../services/api";
  import { formatDate } from "../utils/formatDate";
  import type { Post, Comment } from "../types/Models";
  import { goto } from "@mateothegreat/svelte5-router";

  export let route;
  export let params;
  $: postId = route ? route.result.path.params.id : params.id;
  
  // 文章與留言資料
  let post: Post | null = null;
  let comments: Comment[] = [];
  let newComment = { author: "BagelTheCat", content: "" };
  
  // 編輯模式相關狀態
  let isEditing = false;
  let editedTitle: string = "";
  let editedContent: string = "";
  let editedTags: string[] = [];

  onMount(async () => {
    post = await getAllPostById(postId);
    comments = [...await getCommentsByPostId(postId)];
    // 確保 tags 為陣列
    post.tags = post.tags || [];
    editedTitle = post.title;
    editedContent = post.content;
    editedTags = [...(post.tags || [])];
  });
  
  async function submitComment(): Promise<void> {
    await addComment(postId, newComment.author, newComment.content);
    comments = [...await getCommentsByPostId(postId)];
    newComment.content = "";
  }

  async function togglePublish(): Promise<void> {
    if (post.published) {
      await hidePost(postId);
    } else {
      await publishPost(postId);
    }
    post = await getAllPostById(postId);
  }
  
  function startEditing(): void {
    isEditing = true;
    editedTitle = post.title;
    editedContent = post.content;
    editedTags = [...(post.tags || [])];
  }
  
  function cancelEditing(): void {
    isEditing = false;
  }
  
  async function submitUpdate(): Promise<void> {
    try {
      editedTags = editedTags.filter(tag => tag.trim() !== "");
      await updatePost(postId, editedTitle, editedContent, editedTags);
      post = await getAllPostById(postId);
      isEditing = false;
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async function submitDelete(): Promise<void> {
    try {
      await deletePost(postId);
      console.log("Post deleted successfully");
      goto("/articles");
    } catch (error) {
      console.error("Error deleting post:", error);
    } 
  }

  // 以下改為在元素失焦時更新狀態，避免每次輸入就引起重渲染
  function handleTitleBlur(event: Event): void {
    const target = event.target as HTMLElement;
    editedTitle = target.innerText;
  }
  
  function handleContentBlur(event: Event): void {
    const target = event.target as HTMLElement;
    editedContent = target.innerHTML;
  }

  function handleTagBlur(event: Event, index: number): void {
    const target = event.target as HTMLElement;
    const newValue = target.innerText.trim();
    target.textContent = newValue;  

    if (newValue === "") {
      removeTag(index);    
    } else {
      editedTags[index] = newValue;
      editedTags = [...editedTags];
    }
  }

  // 使用新的陣列重建方式，讓 Svelte 追蹤變化
  function addTag(): void {
    editedTags = [...editedTags, ""];
  }

  function removeTag(index: number): void {
    editedTags.splice(index, 1);
    editedTags = [...editedTags];
  }
</script>

<main>
  {#if post}
    {#if isEditing}
      <div class="edit-mode">
        <!-- 修改：用 on:blur 更新狀態 -->
        <h1 contenteditable="true" on:blur={handleTitleBlur}>
          {editedTitle}
        </h1>
        <div contenteditable="true" on:blur={handleContentBlur}>
          {@html editedContent}
        </div>
        <div class="tags">
          {#each editedTags as tag, index}
            <span class="tag" contenteditable="true" on:blur={event => handleTagBlur(event, index)}>{tag}</span>
            <button class="remove-tag" on:click={() => removeTag(index)}>x</button>
          {/each}
          <button on:click={addTag}>+ Add Tag</button>
        </div>
        <button on:click={togglePublish}>
          {#if post.published}Hide{:else}Publish{/if}
        </button>
        <button on:click={submitUpdate}>Submit Edit</button>
        <button on:click={cancelEditing}>Cancel</button>
        <button on:click={submitDelete}>Delete Post</button>
      </div>
    {:else}
      <h1>{post.title}</h1>
      <div>{@html post.content}</div>
      {#if post.tags && post.tags.length > 0}
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
      <button on:click={startEditing}>Edit Post</button>
      <button on:click={submitDelete}>Delete Post</button>
    {/if}
  {:else}
    <p>Loading post...</p>
  {/if}

  <h2>Comments</h2>
  {#if comments.length > 0}
    <ul>
      {#each comments as comment}
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
  <p>Commenting with BagelTheCat</p>
  <textarea bind:value={newComment.content} placeholder="Your Comment"></textarea>
  <button on:click={submitComment}>Submit Comment</button>
</main>

<style>
  .edit-mode h1,
  .edit-mode div {
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    min-height: 40px;
  }
  h1, div {
    margin-bottom: 1rem;
  }
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    min-height: 100px;
  }
  button {
    margin-right: 1rem;
  }
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
    cursor: text;
  }
  .remove-tag {
    background: none;
    border: none;
    font-size: 14px;
    color: red;
    cursor: pointer;
  }
  .tag:empty::before {
    content: "Enter tag...";
    color: #ccc;
    pointer-events: none;
  }
</style>
