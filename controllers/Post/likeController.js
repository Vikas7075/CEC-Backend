import { Like } from "../../models/Post/like.model.js";


export const addLike = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // check if like already exits
        const existingLike = await Like.findOne({ userId, postId });

        if (existingLike) {
            return res.status(400).json({
                success: false,
                message: " You Already liked this post"
            })
        }
        const like = new Like({ userId, postId });
        await like.save();

        res.status(200).json({
            success: true,
            message: "Post liked Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });

    }
}

export const removeLike = async (req, res) => {
    try {
        const { likedId } = req.params;
        await Like.findByIdAndDelete(likedId);

        res.status(200).json({
            success: true,
            message: "Like Remove Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}