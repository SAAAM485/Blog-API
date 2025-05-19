<script>
    import { onMount } from "svelte";
  import { fetchImages, uploadImages, deleteImage } from "../services/api";

  let images = [];

  async function loadImages() {
    images = await fetchImages();
  }

  async function handleUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const result = await uploadImages(files);
    if (result) {
      alert("圖片上傳成功！");
      loadImages(); // 重新載入圖片
    }
  }

  async function handleDelete(imageId) {
    const success = await deleteImage(imageId);
    if (success) {
      alert("圖片刪除成功！");
      loadImages(); // 重新載入圖片
    }
  }

  onMount(loadImages);
</script>

<main>
    <h1>Welcome to My Blog</h1>

    <input type="file" multiple accept="image/*" on:change="{handleUpload}">

    <div class="gallery">
    {#each images as image}
        <img src="{image.url}" alt="{image.id}">
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