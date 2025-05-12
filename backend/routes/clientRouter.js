const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { validatePost, validateComment } = require("../controllers/validation");

router.get("/", blogController.fetchAllPosts);
router.get("/blogs/:id", blogController.fetchPostById);
router.get("/blogs/:id/comments", blogController.fetchCommentsByPostId);
router.post(
    "/blogs/:id/comments",
    validateComment,
    blogController.createComment
);

module.exports = router;
