const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/auth");
const { validatePost } = require("../controllers/validation");
const upload = require("../middlewares/multer");

router.use(verifyToken);

router.get("/blogs", adminController.fetchAllPosts);
router.get("/blogs/unpublished", adminController.fetchUnpublishedPosts);
router.post("/blogs", validatePost, adminController.createPost);
router.post("/blogs/:id/publish", adminController.unveilPost);
router.post("/blogs/:id/unpublish", adminController.hidePost);
router.put("/blogs/:id", validatePost, adminController.updatePost);
router.delete("/blogs/:id", adminController.deletePost);
router.get("tags", adminController.fetchAllTags);
router.get("tags/:tag", adminController.fetchPostsByTag);
router.get("tags/unpublished", adminController.fetchAllUnpublishedTags);
router.get("tags/unpublished/:tag", adminController.fetchUnpublishedPostsByTag);
router.post("images", upload.array("images"), adminController.uploadImage);
router.delete("images/:id", adminController.deleteImage);

module.exports = router;
