const Post = require("../../models/post/Post")
const User = require("../../models/user/User")

const createPostCtrl = async(req,res)=>{
    const {title, description, category, image, user} = req.body
    const userID = req.session.userData
    const userFound = await User.findById(userID)
    const postCreated = await Post.create({
        title,
        description,
        category,
        user: userID,
    })
    userFound.posts.push(postCreated._id)
    await userFound.save()
    res.json({
        status: "Success",
        post: postCreated
    })
}

const fetchSinglePost = async(req, res) =>{
    const id = req.params.id
    const postFound = await Post.findById(id)
    res.json({
        status: "success",
        data: postFound
    })
}

const fetchAllPosts = async(req, res)=>{
    const posts = await Post.find().populate("comments")
    res.json({
        status: "success",
        data: posts
    })
}

const deletePostCtrl = async (req, res) =>{
    const postFound = await Post.findById(req.params.id)
    if(!postFound.user.toString() == req.session.userData.toString()){
        return res.json({
            data: "You are not allowed to delete this post"
        })
    }
    await Post.findByIdAndDelete(req.params.id)
    res.json({
        status: "success",
        data: "Post has been deleted successfully"
    })
}

const updatePostCtrl = async (req, res) =>{
    const {title, description, category} = req.body
    if(!title || !category || !description){
        return res.json({
            status: "Fail",
            data: "All fields are required"
        })
    }
    const postID = req.params.id
    const postFound = await Post.findById(postID)
    if(!postFound.user.toString() == req.session.userData.toString()){
        return res.json({
            data: "You are not allowed to update this post"
        })
    }
    const postUpdated = await Post.findByIdAndUpdate(postID, {$set:{
        title,
        description, 
        category,
        image: req.file
    }})
    res.json({
        status: "Success",
        data: postUpdated
    })
}
module.exports = {createPostCtrl, fetchSinglePost, fetchAllPosts, deletePostCtrl, updatePostCtrl}