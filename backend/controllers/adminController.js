const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function fetchAllPosts(req, res) {
    try {
        const posts = await db.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}

async function fetchUnpublishedPosts(req, res) {
    try {
        const posts = await db.getUnpublishedPosts();
        res.status(200).json(posts.length > 0 ? posts : []);
    } catch (error) {
        console.error("Error fetching unpublished posts:", error);
        res.status(500).json({ error: "Failed to fetch unpublished posts" });
    }
}

async function createPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { title, content, tags } = req.body;

    try {
        await db.postPost(title, content, tags || []);
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
}

async function unveilPost(req, res) {
    const { id } = req.params;
    try {
        await db.publishPost(parseInt(id));
        res.status(200).json({ message: "Post published successfully" });
    } catch (error) {
        console.error("Error publishing post:", error);
        res.status(500).json({ error: "Failed to publish post" });
    }
}

async function hidePost(req, res) {
    const { id } = req.params;
    try {
        await db.unpublishPost(parseInt(id));
        res.status(200).json({ message: "Post unpublished successfully" });
    } catch (error) {
        console.error("Error unpublishing post:", error);
        res.status(500).json({ error: "Failed to unpublish post" });
    }
}

async function updatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { title, content, tags } = req.body;

    try {
        await db.updatePost(parseInt(id), title, content, tags || []);
        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
}

async function deletePost(req, res) {
    const { id } = req.params;

    try {
        await db.deletePost(parseInt(id));
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
}

async function fetchUnpublishedPostsByTag(req, res) {
    const { tag } = req.params;
    try {
        const posts = await db.getUnpublishedPostsByTag(tag);
        res.status(200).json(posts.length > 0 ? posts : []);
    } catch (error) {
        console.error("Error fetching unpublished posts by tag:", error);
        res.status(500).json({
            error: "Failed to fetch unpublished posts by tag",
        });
    }
}

async function fetchAllUnpublishedTags(req, res) {
    try {
        const tags = await db.getAllUnpublishedTags();
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching unpublished tags:", error);
        res.status(500).json({ error: "Failed to fetch unpublished tags" });
    }
}

async function fetchPostsByTag(req, res) {
    const { tag } = req.params;
    try {
        const posts = await db.getAllPostsByTag(tag);
        res.status(200).json(posts.length > 0 ? posts : []);
    } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
}

async function fetchAllTags(req, res) {
    try {
        const publishedTags = await db.getAllPublishedTags();
        const unpublishedTags = await db.getAllUnpublishedTags();
        res.status(200).json({ publishedTags, unpublishedTags });
    } catch (error) {
        console.error("Error fetching all tags:", error);
        res.status(500).json({ error: "Failed to fetch all tags" });
    }
}

module.exports = {
    fetchAllPosts,
    fetchUnpublishedPosts,
    createPost,
    unveilPost,
    hidePost,
    updatePost,
    deletePost,
    fetchUnpublishedPostsByTag,
    fetchAllUnpublishedTags,
    fetchPostsByTag,
    fetchAllTags,
};
