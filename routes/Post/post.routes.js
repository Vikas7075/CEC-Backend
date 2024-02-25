import express from 'express';
import multer from 'multer';
import { createPost, deletePost, getAllPosts, updatePost } from '../../controllers/Post/postController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
import uploadToCloudinary from '../../utils/cloudinaryUpload.js';

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
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
