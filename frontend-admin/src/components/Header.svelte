<script lang="ts">
    import { goto } from "@mateothegreat/svelte5-router";
    import { logout, userStore } from "../stores/userStore";
    import { get } from "svelte/store";
    import type { UserState } from "../stores/userStore"; // ✅ 型別引用
  
    async function submitLogout(): Promise<void> {
      try {
        await logout();
        const user: UserState = get(userStore); // ✅ 確保取得 store 值
        if (!user.isLoggedIn) {
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  </script>
  
  <header>
    <div class="logo">
      <button on:click|preventDefault={() => goto("/")}>Bagel's Blog</button>
  </div>
    <nav>
      <ul>
        <li><button on:click|preventDefault={() => goto("/about")}>About</button></li>
        <li><button on:click|preventDefault={() => goto("/articles")}>Articles</button></li>
        <li><button on:click|preventDefault={() => goto("/tags")}>Tags</button></li>
        <li><button on:click={submitLogout}>Logout</button></li>
      </ul>
    </nav>
  </header>
  
  <style>
    header {
        background-color: #46b1c9;
        padding: 0;
        text-align: center;
        position: sticky;
        z-index: 1000;
        top: 0;
    }

    header .logo {
        margin: 0 auto;
        padding: 2rem 0;
        display: flex;
        justify-content: center;
    }

    header .logo button {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        text-decoration: none;
        background-color: transparent;
        border: none;
    }

    header .logo:hover {
        background-color: #84C0C6;
    }
    
    nav ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 5rem;
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        display: inline;
        margin: 0;
        align-content: center;
        background-color: #46b1c9;
    }

    nav ul li button {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #46b1c9;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 400;
        letter-spacing: 0.1rem;
        align-content: center;
        border: 0.1rem solid #fff;
    }

    nav ul li button:hover {
        background-color: #84C0C6;
    }
</style>
  