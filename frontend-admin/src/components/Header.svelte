<script>
    import { Link } from "svelte-routing";
    import { logout, userStore } from "../stores/userStore";

    async function submitLogout() {
        try {
            await logout();
            if (!$userStore.isLoggedIn) {
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
    <Link to="/">
        <button>Bagel's Blog</button>
    </Link>
    <nav>
        <Link to="/about">
            <button>About</button>
        </Link>
        <Link to="/articles">
            <button>Articles</button>
        </Link>
        <Link to="/tags">
            <button>Tags</button>
        </Link>
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
