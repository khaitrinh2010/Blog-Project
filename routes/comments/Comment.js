const express = require("express")
const commentRoute = express.Router()
const {createCommentCtrl, deleteCommentCtrl, commentUpdateCtrl, commentDetailCtrl} = require("../../controllers/comments/Comment")
const Comment = require("C:\\Users\\ADMIN\\OneDrive\\Desktop\\FULLSTACK B\\models\\comment\\Comment.js")
//POST/api/v1/comments
commentRoute.post("/:id", createCommentCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "comment created",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //GET/api/v1/comments/:id
commentRoute.get("/:id", commentDetailCtrl,async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "Post comments",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //DELETE/api/v1/comments/:id
commentRoute.delete("/:id", deleteCommentCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "comment deleted",
        });
    } catch (error) {
        res.json(error);
    }
    });

    //PUT/api/v1/comments/:id
commentRoute.put("/:id", commentUpdateCtrl, async (req, res) => {
    try {
        res.json({
        status: "success",
        user: "comment updated",
        });
    } catch (error) {
        res.json(error);
    }});

module.exports = commentRoute