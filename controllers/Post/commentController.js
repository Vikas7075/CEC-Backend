import { Comment } from "../../models/Post/comment.model.js";


// adding comments
export const addComment = async (req, res) => {
    try {
        const { userId, postId, content } = req.body;

        //create  a new comment
        const comment = await Comment.create({ postId, userId, content });

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        console.error('Error adding comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// deleting comments
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({
            success: true,
            message: "Comments deleted successfully"
        })
    } catch (error) {
        console.error('Error deleting comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}