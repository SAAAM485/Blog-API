const { body, validationResult } = require("express-validator");

const usernameLengthErr = "must be between 1 and 10 characters";
const passwordLengthErr = "must be between 1 and 16 characters";
const titleLengthErr = "must be between 1 and 30 characters";

const validateSignIn = [
    body("username")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 10 })
        .withMessage(`Username ${usernameLengthErr}`),
    body("password")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 16 })
        .withMessage(`Password ${passwordLengthErr}`),
];

const validatePost = [
    body("title")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 30 })
        .withMessage(`Post title ${titleLengthErr}`),
    body("tags").isArray().withMessage("Tags must be an array"),
    body("content").trim().notEmpty().withMessage("Content is required"),
];

const validateComment = [
    body("author")
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 10 })
        .withMessage(`Username ${usernameLengthErr}`),
    body("content").trim().notEmpty().withMessage("Content is required"),
];

const validateTagSearch = [
    body("tag")
        .trim()
        .notEmpty()
        .withMessage("Tag is required")
        .isArray()
        .withMessage("Tags must be an array"),
];

module.exports = {
    validateSignIn,
    validatePost,
    validateComment,
    validateTagSearch,
};
