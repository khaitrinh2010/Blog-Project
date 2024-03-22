const express = require("express");
const postRoute = express.Router()
const {createPostCtrl, fetchSinglePost, fetchAllPosts, deletePostCtrl, updatePostCtrl} = require("../../controllers/post/Post")
const multer = require("multer")
const storage = require("../../config/cloudinary")
const upload = multer({ storage })
const Post = require("../../models/post/Post")

postRoute.post("/", upload.single("image"),createPostCtrl, async (req, res) => {
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

postRoute.get("/get-post-form", (req, res)=>{
    res.render("posts/addPost.ejs", {error: ""})
})
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

postRoute.get("/update-post-form/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render("posts/updatePost.ejs", {post, error:""})

})
postRoute.put("/:id", upload.single("image"), updatePostCtrl, async (req, res) => {
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