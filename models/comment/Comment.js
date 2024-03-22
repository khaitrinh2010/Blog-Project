const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
}, {timestamps: true})

const Comment = new mongoose.model("Comment", commentSchema)
module.exports = Comment //Export the model