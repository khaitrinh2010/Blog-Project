const Comment = require("../../models/comment/Comment")
const Post = require("../../models/post/Post")
const User = require("../../models/user/User")


const createCommentCtrl = async (req, res) =>{
    const { message } = req.body
    const postFound = await Post.findById(req.params.id)
    const commentCreated = await Comment.create({
        user: req.session.userData,
        message
    })
    postFound.comments.push(commentCreated._id)
    const user = await User.findById(req.session.userData)
    user.comments.push(commentCreated)
    await postFound.save({validateBeforeSave: false})
    await user.save({
        validateBeforeSave: false
    })
    res.json({
        status: "success",
        data: commentCreated
    })
    user.comments.push(commentCreated)
}

const deleteCommentCtrl = async(req, res)=>{
    const commentFound = await Comment.findById(req.params.id)
    if(!commentFound.user.toString() == req.session.userData.toString()){
        return res.json({
            data: "You are not allowed to delete this comment"
        })
    }
    await Comment.findByIdAndDelete(req.params.id)
    res.json({
        status: "success",
        data: "Comment has been deleted successfully"
    })
}

const commentUpdateCtrl = async(req, res)=>{
    const commentFound = await Comment.findById(req.params.id)
    if(!commentFound){
        return res.json({
            message: "No Comment Found"
        })
    }
    if(!commentFound.user.toString() == req.session.userData.toString()){ //not the one who created
        //the command
        return res.json({
            data: "You are not allowed to update this comment"
        })
    }
    await Comment.findByIdAndUpdate(req.params.id,
        {$set:{
            message: req.body.message
        }})
    res.json({
        status: "success",
        data: commentFound
    })
}
module.exports = {createCommentCtrl, deleteCommentCtrl, commentUpdateCtrl}