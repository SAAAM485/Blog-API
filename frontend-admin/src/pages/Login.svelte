<script lang="ts">
    import { login, userStore } from "../stores/userStore";
    import { get } from "svelte/store";
  
    let username = "";
    let password = "";
  
    async function submitLogin(): Promise<void> {
        try {
            await login(username, password);
            const user = get(userStore);
            if (user.isLoggedIn) {
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
  
  <style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: #4D686A;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }
    label {
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 0.02rem solid #ccc;
        border-radius: 0.5rem;
    }
    button {
        padding: 0.5rem;
        background-color: #46b1c9;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }
    button:hover {
        background-color: #84C0C6;
    }
    h1 {
        color: #4D686A;
        margin-bottom: 2rem;
    }
  </style>