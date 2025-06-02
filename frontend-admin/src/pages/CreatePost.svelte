<script lang="ts">
    import { addPost } from "../services/api";
    import { goto } from "@mateothegreat/svelte5-router";

    let title: string = "";
    let content: string = "";
    let tags: string[] = [];

    async function createPost() {
        try {
            const response = await addPost(title, content, tags);
            console.log("Post created successfully:", response);
            goto("/articles");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    function handleTitleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        title = input.value;
    }

    function handleContentInput(event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        content = textarea.value;
    }

    function handleTagBlur(event: Event, index: number): void {
        const target = event.target as HTMLElement;
        const newValue = target.innerText.trim();
        // 強制將 span 的內容重設為新值
        target.textContent = newValue;  
        // 更新陣列值（如果不同才更新）
        if (newValue === "") {
            removeTag(index);
        } else {
            tags[index] = newValue;
            tags = [...tags]; // 重新賦值以觸發 reactivity
        }
    }



    function addTag(): void {
        tags = [...tags, ""];
    }

    function removeTag(index: number): void {
        tags.splice(index, 1);
        tags = [...tags];
    }
</script>

<main>
    <form on:submit|preventDefault={createPost}>
        <h1>Create New Post</h1>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" bind:value={title} on:input={handleTitleInput} required />
        </div>
        <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" bind:value={content} on:input={handleContentInput} required></textarea>
        </div>
        <div class="tags">
            {#each tags as tag, index}
              <span class="tag" contenteditable="true" on:blur={event => handleTagBlur(event, index)}>{tag}</span>
              <button type="button" class="remove-tag" on:click={() => removeTag(index)}>x</button>
            {/each}
            <button type="button" on:click={addTag}>+ Add Tag</button>
          </div>
        <button type="submit">Create Post</button>
    </form>

</main>

<style>
    main {
      width: 50vw;
      margin: 0 auto;
      padding: 2rem;
      color: #4D686A;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    h1 {
      text-align: center;
      font-size: 2.5rem;
    }
    .form-group {
        display: flex;
        flex-direction: column;
    }
    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    input, textarea {
        padding: 0.5rem;
        border: 0.02rem solid #D8B283;
        border-radius: 0.2rem;
        font-size: 1rem;
    }
    input:focus, textarea:focus {
        border-color: #46b1c9;
        outline: none;
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #D8B283;
        color: #F5F5F4;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }
    button:hover {
        background-color: #F5F5F4;
        color: #D8B283;
    }
    .tags {
        width: 100%;
    }
    .tag {
        margin-right: 0;
        margin-left: 1rem;
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
  