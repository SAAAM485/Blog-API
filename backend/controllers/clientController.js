const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function fetchPublishedPosts(req, res) {
    try {
        const posts = await db.getPublishedPosts();
        res.status(200).json(posts.length > 0 ? posts : []);
    } catch (error) {
        console.error("Error fetching published posts:", error);
        res.status(500).json({ error: "Failed to fetch published posts" });
    }
}

async function fetchPostById(req, res) {
    const { id } = req.params;
    try {
        const post = await db.getPostById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
}

async function fetchPublishedPostsByTag(req, res) {
    const { tag } = req.params;
    try {
        const posts = await db.getPublishedPostsByTag(tag);
        res.status(200).json(posts.length > 0 ? posts : []);
    } catch (error) {
        console.error("Error fetching posts by tag:", error);
        res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
}

async function fetchAllPublishedTags(req, res) {
    try {
        const tags = await db.getAllPublishedTags();
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
}

async function fetchCommentsByPostId(req, res) {
    const { id } = req.params;
    try {
        const comments = await db.getCommentsByPostId(id);
        res.status(200).json(comments.length > 0 ? comments : []);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}

async function createComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { author, content } = req.body;

    try {
        await db.postComment(id, author, content);
        res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

module.exports = {
    fetchPublishedPosts,
    fetchPostById,
    fetchPublishedPostsByTag,
    fetchAllPublishedTags,
    fetchCommentsByPostId,
    createComment,
};
