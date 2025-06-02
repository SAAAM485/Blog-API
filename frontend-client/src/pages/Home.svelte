<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { fetchImages } from "../services/api";
    import type { Image } from "../types/Models";

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://blog-api-production-a8d0.up.railway.app/api";
    let images: Image[] = [];
    let currentIndex = 0;
    let intervalId: number;

    onMount(async () => {
      images = [...await fetchImages()];
      intervalId = setInterval(() => {
      if (images.length > 0) {
          currentIndex = (currentIndex + 1) % images.length;
        }
      }, 3000);
    });
    onDestroy(() => {
      clearInterval(intervalId);
    });
</script>

<main>
    <h1>Welcome to Bagel's Blog</h1>
    <div class="carousel">
      <div class="slides" style="transform: translateX({-currentIndex * 100}%);">
        {#each images as image}
          <div class="slide">
            <img src={`${API_BASE_URL}${image.url}`} alt={image.id}>
          </div>
        {/each}
      </div>
    </div>
</main>

<style>
  h1 {
    text-align: center;
    margin: 2rem 0;
    font-size: 2.5rem;
    color: #4D686A;
  }
  .carousel {
    width: 60vw ;
    margin: 0 auto;
    overflow: hidden;
  }
  /* 使用 flexbox 讓每一張圖片水平排列 */
  .slides {
    display: flex;
    align-items: flex-start;
    transition: transform 0.5s ease-in-out;
  }
  .slide {
    min-width: 100%;
    height: 100%;
  }
  .slide img {
    width: 100%;
    margin: 0;
    object-fit: cover;
    border-radius: 2rem;
  }
</style>