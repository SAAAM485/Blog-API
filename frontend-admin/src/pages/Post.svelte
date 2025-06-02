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
        <div class="edit_buttons">
          <button on:click={togglePublish}>
            {#if post.published}Hide{:else}Publish{/if}
          </button>
          <button on:click={submitUpdate}>Submit Edit</button>
          <button on:click={cancelEditing}>Cancel</button>
          <button on:click={submitDelete}>Delete Post</button>
        </div>
      </div>
    {:else}
      <h1>{post.title}</h1>
      <p class="content">{@html post.content}</p>
      {#if post.tags && post.tags.length > 0}
        <div class="tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      <p>Posted at {formatDate(post.createdAt)}{#if post.updatedAt}&nbsp;/ Updated at {formatDate(post.updatedAt)}{/if}</p>
      <div class="buttons">
        <button on:click={startEditing}>Edit Post</button>
        <button on:click={submitDelete}>Delete Post</button>
      </div>
    {/if}
  {:else}
    <p>Loading post...</p>
  {/if}
  {#if comments.length > 0}
  <div class="comments">
    <h2>Comments</h2>
    <ul>
      {#each comments as comment}
        <li>
          <strong>{comment.author}</strong>
          <span>(Commented at: {formatDate(comment.createdAt)})</span>:
          {comment.content}
        </li>
      {/each}
    </ul>
  </div>
  {:else}
    <p class="notes">No comments yet. Be the first to comment!</p>
  {/if}
  <div class="new_comment">
    <h3>Leave a Comment</h3>
    <p>Commenting with BagelTheCat</p>
    <textarea bind:value={newComment.content} placeholder="Your Comment"></textarea>
    <button on:click={submitComment}>Submit Comment</button>
  </div>  
</main>

<style>
    main {
        max-width: 70vw;
        margin: 2rem auto;
        color: #4D686A;
    }
    h1 {
        text-align: center;
        font-size: 2.5rem;
    }
    p {
        width: 50vw;
        justify-self: center;
        font-size: 0.8rem;
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
    }
    .buttons {
        width: 50vw;
        justify-self: center;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
    }
    .buttons button {
        padding: 0.5rem 1rem;
        margin-right: 1rem;
        border: 0.02rem solid #D8B283;
        border-radius: 0.2rem;
        cursor: pointer;
        background: #F5F5F4;
    }
    .buttons button:hover {
        background: #D8B283;
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
    }
    .comments ul {
        list-style: none;
        padding: 0;
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
    .new_comment h3 {
        font-size: 1.5rem;

    }
    .new_comment textarea {
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
        width: 100%;
    }
    .new_comment button:hover {
        background-color: #F5F5F4;
        color: #D8B283;
    }
    .edit-mode {
        max-width: 50vw;
        margin: 2rem auto;
        padding: 1rem;
        background-color: #f9f9f9;
        border: 1px solid #D8B283;
        border-radius: 5px;
    }
    .edit-mode button {
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.2rem;
        background-color: #F5F5F4;
        color: #D8B283;
        cursor: pointer;
    }
    .edit-mode button:hover {
        background-color: #D8B283;
        color: #F5F5F4;
    }
    .edit-mode .edit_buttons {
        text-align: center;
    } 
    .edit-mode .edit_buttons button {
        width: 8rem;
        margin: 0 1rem;
        background-color: #D8B283;
        color: #F5F5F4;
    } 
    .edit-mode .edit_buttons button:hover {
        background-color: #F5F5F4;
        color: #D8B283;
    } 
    .edit-mode h1,
    .edit-mode div {
        border: 0.02rem solid #D8B283;
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
    .edit-mode .tags {
        width: 100%;
    }
    .edit-mode .tag {
        margin-right: 0;
        margin-left: 1rem;
    }
    .edit-mode .remove-tag {
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
