const express = require("express");
const router = express.Router();
const { validateSignIn } = require("../controllers/validation");
const authController = require("../controllers/authController");

router.post("/login", validateSignIn, authController.login);
router.post("/logout", authController.logout);

module.exports = router;
