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
    <button on:click|preventDefault={() => goto("/")}>Bagel's Blog</button>
    <nav>
      <button on:click|preventDefault={() => goto("/about")}>About</button>
      <button on:click|preventDefault={() => goto("/articles")}>Articles</button>
      <button on:click|preventDefault={() => goto("/tags")}>Tags</button>
      <button on:click={submitLogout}>Logout</button>
    </nav>
  </header>
  
  <style>
    header {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #222;
      color: white;
    }
  </style>
  