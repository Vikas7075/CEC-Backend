import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Comment = model("Comment", commentSchema);
