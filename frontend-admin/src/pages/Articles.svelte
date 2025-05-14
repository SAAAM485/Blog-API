<script>
    import { onMount } from "svelte";
    import { getPosts } from "../services/api.js";
    import { Link } from "svelte-routing"; // ✅ 使用 Svelte Routing

    let posts = [];

    onMount(async () => {
        posts = await getPosts();
        posts.reverse();
    });
</script>

<main>
    <h1>Articles</h1>

    {#if posts.length > 0}
        {#each posts as post}
            <article>
                <h2>
                    <Link to="/post/{post.id}">{post.title}</Link> <!-- ✅ 使用 Link -->
                </h2>
                <p>{post.content}</p>
            </article>
        {/each}
    {:else}
        <p>No articles available. Check back later!</p>
    {/if}
</main>
