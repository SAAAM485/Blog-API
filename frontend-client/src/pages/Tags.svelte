<script>
    import { onMount } from "svelte";
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
            <li><button on:click="{() => fetchPosts(tag)}">{tag}</button></li>
        {/each}
    </ul>

    {#if selectedTag}
        <h2>Posts with tag: {selectedTag}</h2>

        {#if posts.length > 0}
            {#each posts as post}
                <article>
                    <h2><a href={`/post/${post.id}`}>{post.title}</a></h2>
                    <p>{post.content}</p>
                </article>
            {/each}
        {:else}
            <p>No posts found for this tag.</p>
        {/if}
    {/if}
</main>
