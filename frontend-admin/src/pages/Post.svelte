<script>
    export let params;

    import { onMount } from "svelte";
    import { getPostById, getCommentsByPostId, addComment } from "../services/api.js";

    let post = {};
    let comments = [];
    let newComment = { author: "", content: "" };

    const postId = params.id;

    onMount(async () => {
        post = await getPostById(postId);
        comments = await getCommentsByPostId(postId);
    });

    async function submitComment() {
        await addComment(post.id, newComment.author, newComment.content);
        comments = await getCommentsByPostId(postId);
        newComment.author = "";
        newComment.content = "";
    }
</script>

<main>
    <h1>{post.title}</h1>
    <p>{post.content}</p>

    <h2>Comments</h2>
    {#if comments.length > 0}
        <ul>
            {#each comments as comment}
                <li><strong>{comment.author}:</strong> {comment.content}</li>
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
