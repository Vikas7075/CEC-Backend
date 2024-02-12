import mongoose from "mongoose";

const commentSchema = new mongoose.model({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);