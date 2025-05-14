<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";
    import { getPostsByTag, getPosts, getAllTags } from "../services/api.js";

    let tags = [];
    let posts = [];
    let selectedTag = "";

    onMount(async () => {
        tags = await getAllTags();
        posts = await getPosts();
    });

    async function fetchPosts(tag) {
        selectedTag = tag;
        posts = await getPostsByTag(tag);
    }
</script>

<main>
    <h1>Tags</h1>

    <ul>
        {#each tags as tag}
            <li>
                <button on:click={() => fetchPosts(tag)}>{tag}</button>
            </li>
        {/each}
    </ul>

    {#if selectedTag}
        <h2>Posts with tag: {selectedTag}</h2>

        {#if posts.length > 0}
            {#each posts as post}
                <article>
                    <h2>
                        <!-- 使用 Link 來進行前端路由，避免頁面整體重載 -->
                        <Link to={`/post/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <p>{post.content}</p>
                </article>
            {/each}
        {:else}
            <p>No posts found for this tag.</p>
        {/if}
    {/if}
</main>
