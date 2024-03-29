import { Comment } from "../models/Post/comment.model.js";
import { Like } from "../models/Post/like.model.js";
import { Post } from "../models/Post/post.model.js";
import { User } from "../models/User.js"

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//search user by username Or email
export const searchUsers = async (req, res) => {
    const query = req.query.q;
    try {
        const users = await User.find({ $or: [{ name: { $regex: new RegExp(query, 'i') } }, { email: { $regex: new RegExp(query, 'i') } }] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//search all post by post content
export const searchPosts = async (req, res) => {
    const query = req.query.q;
    try {
        const posts = await Post.find({ content: { $regex: new RegExp(query, 'i') } });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.postId;
    try {
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find();
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

