import { Post } from "../../models/Post/post.model.js"
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { User } from "../../models/User.js";
//Get All Posts
export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find().populate('user', 'username headline profilePicture');

        res.status(200).json({
            success: true,
            posts,

        })

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// get post by userId
export const getPostById = async (req, res) => {
    const { userId } = req.params;
    try {
        const post = await Post.find({ user: userId }).populate('user', 'username headline profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePicture headline' // Populate user details for each comment
                }
            });
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// get post by postId   
export const getPostByPostId = async (req, res) => {
    const { postId } = req.params;
    console.log(req.params.postId); //--> comment
    try {
        const post = await Post.findById(postId).populate('user', 'username headline profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePicture headline' // Populate user details for each comment
                }
            });
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// create a new post

// Multer storage configuration for uploading files
const storage = multer.memoryStorage();

// Multer upload configuration
const upload = multer({ storage });

export const createPost = async (req, res) => {
    const user = req.user;
    const { content } = req.body;

    try {
        // Assuming Post.create() is used to create a new post in the database
        const newPost = await Post.create({ content, image: req.body.image, user: user.userId });


        res.status(200).json({
            success: true,
            newPost,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// update Post 
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, image } = req.body;
        const updateField = { content };
        if (image) {
            updateField.image = image;
        }
        const updatePost = await Post.findByIdAndUpdate(id, updateField, { new: true })
        if (!updatePost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Post Updated successfully"
        })
    } catch (error) {
        console.error('Error updating posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//deleting Post by userId
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        console.error('Error deleting posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// deleteing post by postId
//deleting Post by userId
export const deletePostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        console.error('Error deleting posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}