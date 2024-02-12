import express from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../../controllers/Post/postController.js';

export const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);