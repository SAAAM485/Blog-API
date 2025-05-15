const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verifyToken = require("../middlewares/auth");
const { validatePost } = require("../controllers/validation");

router.use(verifyToken);

router.get("/blogs", blogController.fetchAllPosts);
router.get("/blogs/unpublished", blogController.fetchUnpublishedPosts);
router.post("/blogs", validatePost, blogController.createPost);
router.post("/blogs/:id/publish", blogController.unveilPost);
router.post("/blogs/:id/unpublish", blogController.hidePost);
router.put("/blogs/:id", validatePost, blogController.updatePost);
router.delete("/blogs/:id", blogController.deletePost);
router.get("tags", blogController.fetchAllTags);
router.get("tags/:tag", blogController.fetchPostsByTag);
router.get("tags/unpublished", blogController.fetchAllUnpublishedTags);
router.get("tags/unpublished/:tag", blogController.fetchUnpublishedPostsByTag);

module.exports = router;
