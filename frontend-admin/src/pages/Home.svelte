<script>
    let images = ["../assets/images/photo1.jpg", "../assets/images/photo2.jpg", "../assets/images/photo3.jpg"];
</script>

<main>
    <h1>Welcome to My Blog</h1>
    <div class="gallery">
        {#each images as img}
            <img src="{img}" alt="Blog Photo">
        {/each}
    </div>
</main>

<style>
    .gallery img {
        width: 100%;
        max-width: 300px;
        margin: 10px;
    }
</style>