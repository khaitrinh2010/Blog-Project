const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["react js", "html", "css", "node js", "javascript", "other"]
    },
    image: {
        type: String,
        // required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }]
})

const Post = new mongoose.model("Post", postSchema)
module.exports = Post