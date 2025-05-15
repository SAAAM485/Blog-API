<script>
    export let params;
  
    import { onMount } from "svelte";
    import { 
      getPostById, 
      getCommentsByPostId,
      publishPost,
      hidePost,
      addComment, 
      updatePost 
    } from "../services/api.js";
    import { formatDate } from "../utils/formatDate.js";
  
    // 文章與留言資料
    let post = {};
    let comments = [];
    let newComment = { author: "BagelTheCat", content: "" };
  
    // 編輯模式相關狀態
    let isEditing = false;
    let editedTitle = "";
    let editedContent = "";
    const postId = params.id;
  
    onMount(async () => {
      post = await getPostById(postId);
      comments = await getCommentsByPostId(postId);
      editedTitle = post.title;
      editedContent = post.content;
    });
  
    async function submitComment() {
      await addComment(post.id, newComment.author, newComment.content);
      comments = await getCommentsByPostId(postId);
      newComment.content = "";
    }

    async function togglePublish() {
      if (post.published) {
        await hidePost(postId);
      } else {
        await publishPost(postId);
      }
    }
  
    function startEditing() {
      isEditing = true;
      editedTitle = post.title;
      editedContent = post.content;
    }
  
    function cancelEditing() {
      isEditing = false;
    }
  
    async function submitUpdate() {
      try {
        await updatePost(post.id, editedTitle, editedContent);
        post = await getPostById(postId);
        isEditing = false;
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }

    function handleTitleInput(e) {
      editedTitle = e.target.innerText;
    }
  
    function handleContentInput(e) {
      editedContent = e.target.innerHTML;
    }
  </script>
  
  <main>
    {#if isEditing}
      <div class="edit-mode">
        <h1 contenteditable="true" on:input={handleTitleInput}>
          {editedTitle}
        </h1>
        <div contenteditable="true" on:input={handleContentInput}>
          {@html editedContent}
        </div>
        <button on:click={togglePublish}>{#if post.published}Hide{:else}Publish{/if}</button>
        <button on:click={submitUpdate}>Submit Edit</button>
        <button on:click={cancelEditing}>Cancel</button>
      </div>
    {:else}
      <h1>{post.title}</h1>
      <div>{@html post.content}</div>
      <p>Posted at: {formatDate(post.createdAt)}</p>
        {#if post.updatedAt}
            <p>Updated at: {formatDate(post.updatedAt)}</p>
        {/if}
      <button on:click={startEditing}>Edit Post</button>
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
  </style>
  