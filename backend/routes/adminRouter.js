const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/auth");
const { validatePost, validatePut } = require("../controllers/validation");
const upload = require("../middlewares/multer");
const imageController = require("../controllers/imageController");

router.use(verifyToken);

router.get("/blogs/unpublished", adminController.fetchUnpublishedPosts);
router.get("/blogs", adminController.fetchAllPosts);
router.post("/blogs/:id/publish", adminController.unveilPost);
router.post("/blogs/:id/unpublish", adminController.hidePost);
router.post("/blogs", validatePost, adminController.createPost);
router.put("/blogs/:id", validatePut, adminController.updatePost);
router.delete("/blogs/:id", adminController.deletePost);

router.get("/tags/unpublished", adminController.fetchAllUnpublishedTags);
router.get(
    "/tags/unpublished/:tag",
    adminController.fetchUnpublishedPostsByTag
);
router.get("/tags", adminController.fetchAllTags);
router.get("/tags/:tag", adminController.fetchPostsByTag);

router.post("/images", upload.array("images"), imageController.uploadImages);
router.delete("/images/:id", imageController.deleteImage);

module.exports = router;
