<script>
    import { login, userStore } from "../stores/userStore";
  
    let username = "";
    let password = "";
  
    async function submitLogin() {
        try {
            await login(username, password);
            if ($userStore.isLoggedIn) {
                console.log("Login successful");
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
  </script>
  
  <main>
      <h1>Login</h1>
      <form on:submit|preventDefault={submitLogin}>
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required bind:value={username} />
          <br />
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required bind:value={password} />
          <br />
          <button type="submit">Login</button>
      </form>
  </main>
  