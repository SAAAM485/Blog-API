const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.fetchAllPosts);
router.get("/blogs/:id", blogController.fetchPostById);
router.post("/", blogController.createPost);
router.post("/blogs/:id/publish", blogController.unveilPost);
router.post("/blogs/:id/unpublish", blogController.hidePost);
router.put("/blogs/:id", blogController.updatePost);
router.delete("/blogs/:id", blogController.deletePost);
router.get("/blogs/:id/comments", blogController.fetchCommentsByPostId);
router.post("/blogs/:id/comments", blogController.createComment);

module.exports = router;
