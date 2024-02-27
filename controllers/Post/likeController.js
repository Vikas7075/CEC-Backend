import { isValidObjectId } from "mongoose";
import { Like } from "../../models/Post/like.model.js";
import { Post } from "../../models/Post/post.model.js";

export const togglePostLike = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!isValidObjectId(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ postId: postId, likedBy: req.user.userId });

        if (existingLike) {
            // If the user has already liked the post, remove the like
            await Like.findByIdAndDelete(existingLike._id);
            // remove the like id from post's likes array
            await Post.findByIdAndUpdate(postId, { $pull: { likes: existingLike._id } })

            return res.status(200).json({
                success: true,
                message: "Post like removed successfully",
            });
        } else {
            // If the user has not liked the post, add the like
            const newLike = await Like.create({ postId: postId, likedBy: req.user.userId });

            if (!newLike) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to add like to the post"
                });
            }
            // Add the like to the post's likes array
            await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

            return res.status(201).json({
                success: true,
                message: "Post liked successfully",
                newLike
            });
        }

    } catch (error) {
        console.error("Error toggling post like:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};
