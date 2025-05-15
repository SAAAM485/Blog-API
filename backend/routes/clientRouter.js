const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const {
    validateTagSearch,
    validateComment,
} = require("../controllers/validation");

router.get("/blogs", blogController.fetchPublishedPosts);
router.get("/blogs/:id", blogController.fetchPostById);
router.get("/blogs/:id/comments", blogController.fetchCommentsByPostId);
router.post(
    "/blogs/:id/comments",
    validateComment,
    blogController.createComment
);
router.get(
    "/tags/:tag",
    validateTagSearch,
    blogController.fetchPublishedPostsByTag
);
router.get("/tags", blogController.fetchAllPublishedTags);

module.exports = router;
