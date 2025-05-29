<script lang="ts">
    import { goto } from "@mateothegreat/svelte5-router";
</script>

<header>
        <button on:click|preventDefault={() => goto("/")}>Bagel's Blog</button>
    <nav>
        <button on:click|preventDefault={() => goto("/about")}>About</button>
        <button on:click|preventDefault={() => goto("/articles")}>Articles</button>
        <button on:click|preventDefault={() => goto("/tags")}>Tags</button>
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: #222;
        color: white;
    }
</style>
