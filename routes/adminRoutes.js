import express from "express";
import { deletePost, deleteUser, getAllComments, getAllLikes, getAllPosts, getAllUsers, searchPosts, searchUsers } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express();

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/posts', verifyToken, isAdmin, getAllPosts);
router.get('/comments', verifyToken, isAdmin, getAllComments);
router.get('/likes', verifyToken, isAdmin, getAllLikes);
router.delete('/posts/:postId', verifyToken, isAdmin, deletePost);
router.delete('/users/:userId', verifyToken, isAdmin, deleteUser);

router.get('/search/users', verifyToken, isAdmin, searchUsers);
router.get('/search/posts', verifyToken, isAdmin, searchPosts);



export default router;