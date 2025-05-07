const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function fetchAllPosts(req, res) {}

async function fetchPostById(req, res) {}

async function createPost(req, res) {}

async function unveilPost(req, res) {}

async function hidePost(req, res) {}

async function updatePost(req, res) {}

async function deletePost(req, res) {}

async function fetchCommentsByPostId(req, res) {}

async function createComment(req, res) {}

module.exports = {
    fetchAllPosts,
    fetchPostById,
    createPost,
    unveilPost,
    hidePost,
    updatePost,
    deletePost,
    fetchCommentsByPostId,
    createComment,
};
