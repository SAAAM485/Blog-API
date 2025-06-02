<script lang="ts">
    let aboutContent: string = "Hi! I'm Bagel, this is my personal blog!\nThis blog is built with Typescript + Svelte5 + Vite, and an API built with Node.js + Express + Prisma.";
  
    function handleInput(event: Event): void {
      const target = event.target as HTMLParagraphElement;
      aboutContent = target.innerText;
    }
  </script>
  
  <main>
    <h1>About Me</h1>
    <p contenteditable="true" on:input={handleInput}>
      {aboutContent}
    </p>
  </main>
  
  <style>
    main {
        text-align: center;
        margin: 2rem auto;
        max-width: 70vw;
    }
    h1 {
        font-size: 2.5rem;
        color: #4D686A;
    }
    p {
        font-size: 1.2rem;
        color: #4D686A;
        line-height: 3;
        white-space: pre-wrap;
    }
</style>