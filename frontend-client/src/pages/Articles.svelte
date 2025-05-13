<script>
    import { onMount } from "svelte";
    import { getPosts } from "../services/api.js";
    let posts = [];

    onMount(async () => {
        posts = await getPosts();
        posts.reverse(); // 🔄 從新到舊排列
    });
</script>

<main>
    <h1>Articles</h1>

    {#if posts.length > 0}
        {#each posts as post}
            <article>
                <h2><a href={`/post/${post.id}`}>{post.title}</a></h2>
                <p>{post.content}</p>
            </article>
        {/each}
    {:else}
        <p>No articles available. Check back later!</p> <!-- ✅ 顯示訊息 -->
    {/if}
</main>
