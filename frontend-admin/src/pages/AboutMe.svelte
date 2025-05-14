<script>
    let aboutContent = "Hi! I'm [你的名字]，這是我的個人部落格，分享技術、生活和點滴！";
  
    function handleInput(event) {
      aboutContent = event.target.innerText;
    }
  </script>
  
  <main>
    <h1>About Me</h1>
    <p contenteditable="true" on:input={handleInput}>
      {aboutContent}
    </p>
  </main>
  
  