import express from 'express';
import { addCommentToPost, deleteComment } from '../../controllers/Post/commentController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Route to add a comment to a post
router.post('/:postId/comments', verifyToken, addCommentToPost);

// Route to delete a comment
router.delete('/comments/:commentId', verifyToken, deleteComment);

export default router;
