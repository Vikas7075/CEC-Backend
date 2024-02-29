import express from 'express';
import { addCommentToPost, deleteComment, getComments } from '../../controllers/Post/commentController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Route to add a comment to a post
router.post('/:postId', verifyToken, addCommentToPost);

//Route to get comments of a post
router.get('/:postId', getComments)

// Route to delete a comment
router.delete('/:commentId', verifyToken, deleteComment);

export default router;
