<script lang="ts">
    import { onMount } from "svelte";
    import { fetchImages, uploadImages, deleteImage } from "../services/api";
    import type { Image } from "../types/Models";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    let images: Image[] = [];

    async function loadImages():Promise<void> {
      images = [...await fetchImages()];
    }

    async function handleUpload(event: Event): Promise<void> {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (!files || files.length === 0) return;

      const result = await uploadImages(Array.from(files));
      if (result) {
        alert("Images uploaded successfully!");
        await loadImages();
      }
    }

    async function handleDelete(imageId: string): Promise<void> {
      try {
        await deleteImage(imageId);
        alert("Image deleted successfully!");
        await loadImages();
      } catch (error) {
        console.error(`Error deleting image (${imageId}):`, error);
        alert("Error deleting image. Please try again.");
      }
    }



    onMount(async () => {
      await loadImages();
    });
</script>

<main>
    <h1>Welcome to My Blog</h1>

    <input type="file" multiple accept="image/*" on:change="{handleUpload}">

    <div class="gallery">
    {#each images as image}
        <img src={`${API_BASE_URL}${image.url}`} alt="{image.id}">
        <button on:click="{() => handleDelete(image.id)}">Delete</button>
    {/each}
</div>
</main>

<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gallery img {
    width: 100%;
    max-width: 200px;
  }
</style>