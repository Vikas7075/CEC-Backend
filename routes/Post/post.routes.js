import express from 'express';
import multer from 'multer';
import { createPost, deletePost, getAllPosts, getPostById, getPostByPostId, deletePostByPostId, updatePost } from '../../controllers/Post/postController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import uploadToCloudinary from '../../utils/cloudinaryUpload.js';
import { isAdmin } from '../../middleware/isAdmin.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const uploadToCloudinary = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No image file provided' });
//         }

//         // Write buffer data to a temporary file
//         const tempFilePath = path.join(process.cwd(), 'uploads', `${Date.now()}-${req.file.originalname}`);
//         await writeFile(tempFilePath, req.file.buffer);


//         // Upload temporary file to Cloudinary
//         const result = await cloudinary.uploader.upload(tempFilePath, {
//             folder: 'uploads',
//             resource_type: 'auto' // Automatically detect the file type
//         });

//         // Delete temporary file
//         fs.unlinkSync(tempFilePath);

//         // Add Cloudinary image URL to req.body
//         req.body.image = result.secure_url;

//         next();
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



router.post('/', verifyToken, upload.single('image'), uploadToCloudinary, createPost);

//router.post('/', verifyToken, uploadToCloudinary, createPost); // Using multer to handle single file upload with field name 'image'
router.get('/', getAllPosts);
router.get('/admin/', verifyToken, isAdmin, getAllPosts);
router.get('/:userId', verifyToken, getPostById);
router.get('/:postId/admin', verifyToken, isAdmin, getPostByPostId);
router.delete('/:id', verifyToken, deletePost);
router.delete('/:postId/admin', verifyToken, isAdmin, deletePostByPostId);
router.put('/:id', verifyToken, upload.single('image'), uploadToCloudinary, updatePost);

export default router;
