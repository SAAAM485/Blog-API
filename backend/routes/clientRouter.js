const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const {
    validateTagSearch,
    validateComment,
} = require("../controllers/validation");
const imageController = require("../controllers/imageController");

router.get("/blogs", clientController.fetchPublishedPosts);
router.get("/blogs/:id", clientController.fetchPostById);
router.get("/blogs/:id/comments", clientController.fetchCommentsByPostId);
router.post(
    "/blogs/:id/comments",
    validateComment,
    clientController.createComment
);
router.get(
    "/tags/:tag",
    validateTagSearch,
    clientController.fetchPublishedPostsByTag
);
router.get("/tags", clientController.fetchAllPublishedTags);
router.get("/images", imageController.fetchAllImages);

module.exports = router;
