<script>
    import { Link } from "svelte-routing";
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
