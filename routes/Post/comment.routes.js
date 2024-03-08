import express from 'express';
import { addCommentToPost, deleteComment, getAllComments, getComments } from '../../controllers/Post/commentController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import { isAdmin } from '../../middleware/isAdmin.js';

const router = express.Router();

// Route to add a comment to a post
router.post('/:postId', verifyToken, addCommentToPost);

//Route to get comments of a post
router.get('/:postId', getComments)
router.get('/admin/allComments', verifyToken, isAdmin, getAllComments)

// Route to delete a comment
router.delete('/:commentId', verifyToken, deleteComment);
router.delete('/:commentId/admin', verifyToken, isAdmin, deleteComment);

// // Admin routes for comments
// router.get('/comments', isAdmin, getAllComments);
// router.delete('/comments/:commentId', isAdmin, deleteCommentById);

export default router;
