<script lang="ts">
    import { onMount } from "svelte";
    import { fetchImages } from "../services/api";
    import type { Image } from "../types/Models";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    let images: Image[] = [];

    onMount(async () => {
      images = [...await fetchImages()];
    });
</script>

<main>
    <h1>Welcome to My Blog</h1>
    <div class="gallery">
        {#each images as image}
          <img src={`${API_BASE_URL}${image.url}`} alt={image.id}>
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