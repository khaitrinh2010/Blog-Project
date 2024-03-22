const Comment = require("../../models/comment/Comment")
const Post = require("../../models/post/Post")
const User = require("../../models/user/User")

const createCommentCtrl = async (req, res) =>{
    await Comment.deleteMany({})
    const { message } = req.body
    const postFound = await Post.findById(req.params.id)
    const commentCreated = await Comment.create({
        user: req.session.userData,
        message,
        post: postFound._id
    })
    postFound.comments.push(commentCreated)
    const user = await User.findById(req.session.userData)
    user.comments.push(commentCreated)
    await postFound.save({validateBeforeSave: false})
    await user.save({
        validateBeforeSave: false
    })
    
    return res.redirect(`/api/v1/posts/${postFound._id}`)
}

const deleteCommentCtrl = async(req, res)=>{
    const commentFound = await Comment.findById(req.params.id)
    const postFound = commentFound.post
    console.log(postFound)
    if(!commentFound.user.toString() == req.session.userData.toString()){
        return res.json({
            data: "You are not allowed to delete this comment"
        })
    }
    await Comment.findByIdAndDelete(req.params.id)
    return res.redirect(`/api/v1/posts/${postFound._id}`)
}

const commentUpdateCtrl = async(req, res)=>{
    const commentFound = await Comment.findById(req.params.id)
    if(!commentFound.user.toString() == req.session.userData.toString()){ //not the one who created
        //the command
        return res.render("comments/updateComment.ejs", {error: "You are not allowed to modify this comment", comment: commentFound})
    }
    await Comment.findByIdAndUpdate(req.params.id,
        {$set:{
            message: req.body.message
        }})
        return res.redirect(`/api/v1/posts/${commentFound.post}`)
}

const commentDetailCtrl = async (req, res)=>{
    const comment = await Comment.findById(req.params.id)
    res.render("comments/updateComment.ejs", {error: "", comment})
}
module.exports = {commentDetailCtrl,createCommentCtrl, deleteCommentCtrl, commentUpdateCtrl}