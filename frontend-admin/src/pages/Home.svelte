<script lang="ts">
    import { onMount } from "svelte";
    import { fetchImages, uploadImages, deleteImage } from "../services/api";
    import type { Image } from "../types/Models";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://blog-api-production-a8d0.up.railway.app/api";
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
  h1 {
      text-align: center;
      margin: 2rem 0;
      font-size: 2.5rem;
      color: #4D686A;
  }
  input[type="file"] {
      display: block;
      width: 50vw;
      margin: 0 auto 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 0.02rem solid #D8B283;
      border-radius: 0.2rem;
      cursor: pointer;
      background: #F5F5F4;
      color: #4D686A;
  }
  input::file-selector-button {
      border: 0.02rem solid #D8B283;
      border-radius: 0.2rem;
      cursor: pointer;
      background: #F5F5F4;
      color: #4D686A;
  }
  input::file-selector-button:hover {
      background: #D8B283;
  }
  .gallery {
      margin-top: 2rem;
      justify-self: center;
      align-items: center;
      width: 60vw;
      display: flex;
      flex-direction: column;
      gap: 10px;
  }
  .gallery img {
      width: 100%;
      max-width: 40vw;
      display: flex;
      border-radius: 0.5rem;
  }
  button {
      border: 0.02rem solid #D8B283;
      border-radius: 0.2rem;
      cursor: pointer;
      background: #F5F5F4;
      color: #4D686A;
      margin-bottom: 1rem;
  }
  button:hover {
      background: #D8B283;
  }
</style>