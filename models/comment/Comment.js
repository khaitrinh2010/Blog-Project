const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
})

const Comment = new mongoose.model("Comment", commentSchema)
module.exports = Comment //Export the model