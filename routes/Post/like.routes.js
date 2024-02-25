import express from 'express';
import { togglePostLike } from '../../controllers/Post/likeController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';


const router = express.Router();

// Route to toggle post like
router.post('/:postId/toggle', verifyToken, togglePostLike);

export default router;
