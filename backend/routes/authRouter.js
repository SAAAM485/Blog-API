const express = require("express");
const router = express.Router();
const { validateSignIn } = require("../controllers/validation");
const { login, logout } = require("../controllers/blogController");

router.post("/login", validateSignIn, login);
router.post("/logout", logout);

module.exports = router;
