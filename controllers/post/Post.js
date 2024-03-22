const Post = require("../../models/post/Post")
const User = require("../../models/user/User")

const createPostCtrl = async(req,res)=>{
    const {title, description, category, user} = req.body
    if(!title || !description || !category){
        return res.render("posts/addPost.ejs", {error:"All fields are required"})
    }
    const userID = req.session.userData
    const userFound = await User.findById(userID)
    const postCreated = await Post.create({
        title,
        description,
        category,
        user: userID,
        image: req.file.path
    })
    userFound.posts.push(postCreated._id)
    await userFound.save()
    res.redirect("/api/v1/users/profile-page")
}

const fetchSinglePost = async(req, res) =>{
    const id = req.params.id
    //find the comments field in the current document
    //For each document fetched from the comments collection in the first populate call, Mongoose looks at the user field. 
    const postFound = await Post.findById(id).populate("user").populate({path:"comments", populate: {path: "user"}})
    //instead of having just the ObjectID in the user  field of posts, you will 
    //have the aactual user object
    res.render("posts/postDetails.ejs", { post: postFound})
}

const fetchAllPosts = async(req, res)=>{
    const posts = await Post.find().populate("comments").populate("user") //take the
    //field name from other collection
    res.json({
        status: "success",
        data: posts
    })
}

const deletePostCtrl = async (req, res) =>{
    const postFound = await Post.findById(req.params.id)
    console.log(postFound)
    if(!(postFound.user.toString() == req.session.userData.toString())){
        return res.render("posts/postDetails.ejs", {error: "You are not allowed to delete this"}, {post: postFound})
    }
    await Post.findByIdAndDelete(req.params.id)
    return res.redirect("/") //redirect to home page
}

const updatePostCtrl = async (req, res) =>{
    const {title, description, category} = req.body
    const postID = req.params.id
    const postFound = await Post.findById(postID)
    if(!title || !category || !description){
        return res.render("posts/updatePost.ejs", {post: postFound, error: "All fields are required"})
    }
    if(!postFound.user.toString() == req.session.userData.toString()){
        return res.json({
            data: "You are not allowed to update this post"
        })
    }
    const postUpdated = await Post.findByIdAndUpdate(postID, {$set:{
        title,
        description, 
        category,
        image: req.file ? req.file.path : postFound.image
    }})
    return res.redirect("/api/v1/users/profile-page")
}
module.exports = {createPostCtrl, fetchSinglePost, fetchAllPosts, deletePostCtrl, updatePostCtrl}