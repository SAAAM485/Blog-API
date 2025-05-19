<script>
    import { onMount } from "svelte";
    import { fetchImages } from "../services/api";

    let images = [];

    onMount(async () => {
        images = await fetchImages();
    });
</script>

<main>
    <h1>Welcome to My Blog</h1>
    <div class="gallery">
        {#each images as image}
          <img src="{image.url}" alt="{image.id}">
        {/each}
      </div>
</main>

<style>
    .gallery {
      display: flex;
      overflow: hidden;
      width: 100%;
      gap: 10px;
    }
    .gallery img {
      max-width: 250px;
    }
  </style>