import { Post } from "../../models/Post/post.model.js"


//Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');  // Populate the 'user' field with the username
        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// create a new post

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const newPost = await Post.create({ content, user: req.user._id });
        res.status(200).json({
            success: true,
            newPost
        })
    } catch (error) {

        console.error('Error creating posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

// update Post 
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatePost = await Post.findByIdAndUpdate(id, { content }, { new: true })
        if (!updatePost) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }
    } catch (error) {
        console.error('Error updating posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//deleting Post
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