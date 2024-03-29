import { isValidObjectId } from "mongoose";
import { Post } from "../../models/Post/post.model.js";
import { Comment } from "../../models/Post/comment.model.js";

// Controller to add a comment to a post
export const addCommentToPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;

        if (!isValidObjectId(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const comment = new Comment({
            postId: postId,
            user: req.user.userId,
            content
        });

        await comment.save();

        // Add the comment to the post's comments array
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            success: true,
            message: "Comment added Successfully",
            comment
        })
    } catch (error) {
        console.error("Error adding comment to post:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

// Get all comments of a post
export const getComments = async (req, res) => {
    const { postId } = req.params;
    try {
        if (!isValidObjectId(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const comments = await Comment.find({ postId }).populate('user', 'username headline profilePicture')

        return res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get all comments 
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user', 'username headline profilePicture');

        return res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!isValidObjectId(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment ID"
            });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Check if the user has permission to delete the comment
        if (comment.user._id.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        // Remove the comment from the post's comments array
        await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};
