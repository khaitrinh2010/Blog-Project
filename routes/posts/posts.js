const express = require("express");
const postRoute = express.Router()
const {createPostCtrl, fetchSinglePost, fetchAllPosts, deletePostCtrl, updatePostCtrl} = require("../../controllers/post/Post")
const multer = require("multer")
const storage = require("../../config/cloudinary")
const upload = multer({ storage })

postRoute.post("/", upload.single("images"),createPostCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Post created",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //GET/api/v1/posts
postRoute.get("/",fetchAllPosts, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Posts list",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //GET/api/v1/posts/:id
postRoute.get("/:id", fetchSinglePost, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Post details",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //DELETE/api/v1/posts/:id
postRoute.delete("/:id", deletePostCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Post deleted",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //PUT/api/v1/posts/:id
postRoute.put("/:id", upload.single("file"), updatePostCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Post updated",
        });
    } catch (error) {
        res.json(error);
    }
    });

module.exports = postRoute