<script lang="ts">
    export let params;
  
    import { onMount } from "svelte";
    import { 
      getPostById, 
      getCommentsByPostId,
      publishPost,
      hidePost,
      addComment, 
      updatePost 
    } from "../services/api";
    import { formatDate } from "../utils/formatDate";
    import type { Post, Comment } from "../types/Models";
  
    // 文章與留言資料
    let post: Post | null = null;
    let comments: Comment[] = [];
    let tags: string[] = [];
    let newComment = { author: "BagelTheCat", content: "" };
  
    // 編輯模式相關狀態
    let isEditing = false;
    let editedTitle: string = "";
    let editedContent: string = "";
    let editedTags: string[] = [];
    const postId = params.id;
  
    onMount(async () => {
      post = await getPostById(postId);
      comments = [...await getCommentsByPostId(postId)];
      editedTitle = post.title;
      editedContent = post.content;
      editedTags = post.tags || [];
    });
  
    async function submitComment(): Promise<void> {
      await addComment(post.id, newComment.author, newComment.content);
      comments = await getCommentsByPostId(postId);
      newComment.content = "";
    }

    async function togglePublish(): Promise<void> {
      if (post.published) {
        await hidePost(postId);
      } else {
        await publishPost(postId);
      }
      post = await getPostById(postId);
    }
  
    function startEditing(): void {
      isEditing = true;
      editedTitle = post.title;
      editedContent = post.content;
      editedTags = post.tags || [];
    }
  
    function cancelEditing(): void {
      isEditing = false;
    }
  
    async function submitUpdate(): Promise<void> {
      try {
        editedTags = editedTags.filter(tag => tag.trim() !== ""); // ✅ 移除空白標籤
        await updatePost(post.id, editedTitle, editedContent, editedTags);
        post = await getPostById(postId);
        isEditing = false;
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }

    function handleTitleInput(event: Event): void {
      const target = event.target as HTMLHeadingElement;
      editedTitle = target.innerText;
    }
  
    function handleContentInput(event: Event): void {
      const target = event.target as HTMLDivElement;
      editedContent = target.innerHTML;
    }

    function handleTagInput(event: Event, index: number): void {
      const target = event.target as HTMLElement;
      editedTags[index] = target.innerText.trim();
    }

    function addTag(): void {
      editedTags.push(""); // ✅ 加入一個新標籤
    }

    function removeTag(index: number): void {
      editedTags.splice(index, 1); // ✅ 從陣列移除指定索引的標籤
    }


  </script>
  
  <main>
    {#if isEditing}
      <div class="edit-mode">
        <h1 contenteditable="true" on:input={handleTitleInput}>
          {editedTitle}
        </h1>
        <div contenteditable="true" on:input={handleContentInput}>
          {editedContent}
        </div>
        <div class="tags">
          {#each editedTags as tag, index}
            <span class="tag" contenteditable="true" on:input={event => handleTagInput(event, index)}>
              {tag}
            </span>
            <button class="remove-tag" on:click={() => removeTag(index)}>x</button>
          {/each}
          <button on:click={addTag}>+ Add Tag</button>
        </div>
        <button on:click={togglePublish}>{#if post.published}Hide{:else}Publish{/if}</button>
        <button on:click={submitUpdate}>Submit Edit</button>
        <button on:click={cancelEditing}>Cancel</button>
      </div>
    {:else}
      <h1>{post.title}</h1>
      <div>{post.content}</div>
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
  </style>
  