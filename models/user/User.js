const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    coverImage: {
        type: String
    },
    posts: [{type: mongoose.Schema.ObjectId, ref: "Post"}],
    comments: [{type: mongoose.Schema.ObjectId, ref: "Comment"}]
}, {
    timestamps: true
})

const User = new mongoose.model("User", userSchema)
module.exports = User