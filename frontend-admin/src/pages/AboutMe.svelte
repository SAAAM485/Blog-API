<script lang="ts">
    let aboutContent: string = "Hi! I'm [你的名字]，這是我的個人部落格，分享技術、生活和點滴！";
  
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
  
  