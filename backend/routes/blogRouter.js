const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { verifyToken } = require("../middlewares/auth");
const { validatePost, validateComment } = require("../controllers/validation");

router.get("/", blogController.fetchAllPosts);
router.get("/blogs/:id", blogController.fetchPostById);
router.post("/", validatePost, blogController.createPost);
router.post("/blogs/:id/publish", blogController.unveilPost);
router.post("/blogs/:id/unpublish", blogController.hidePost);
router.put("/blogs/:id", validatePost, blogController.updatePost);
router.delete("/blogs/:id", blogController.deletePost);
router.get("/blogs/:id/comments", blogController.fetchCommentsByPostId);
router.post(
    "/blogs/:id/comments",
    validateComment,
    blogController.createComment
);

router.post("/login", verifyToken, blogController.login);

module.exports = router;
