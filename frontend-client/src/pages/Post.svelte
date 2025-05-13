<script>
    import { onMount } from "svelte";
    import {getPostById, getCommentsByPostId, addComment } from "../services/api.js"; 
    let post = {};
    let comments = [];
    let newComment = { author: "", content: "" };

    onMount(async () => {
        const postId = window.location.pathname.split("/").pop();
        post = await getPostById(postId);

        comments = await getCommentsByPostId(postId);
    });

    async function submitComment() {
        await addComment(post.id, newComment.author, newComment.content);
        location.reload(); // 🔄 重新加載留言
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
        <p>No comments yet. Be the first to comment!</p> <!-- ✅ 當沒有留言時，顯示訊息 -->
    {/if}
    <h3>Leave a Comment</h3>
    <input type="text" bind:value="{newComment.username}" placeholder="Your Name" />
    <textarea bind:value="{newComment.content}" placeholder="Your Comment"></textarea>
    <button on:click="{submitComment}">Submit</button>
</main>
