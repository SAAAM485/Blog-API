<script>
    import { onMount } from "svelte";
    import { getPublishedPosts } from "../services/api.js";
    import { Link } from "svelte-routing";
    import { formatDate } from "../utils/formatDate.js";

    let posts = [];

    onMount(async () => {
        posts = await getPublishedPosts();
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
                <p>Posted at: {formatDate(post.createdAt)}</p>
                {#if post.updatedAt}
                  <p>Updated at: {formatDate(post.updatedAt)}</p>
                {/if}
                <p>{post.content}</p>
            </article>
        {/each}
    {:else}
        <p>No articles available. Check back later!</p>
    {/if}
</main>
