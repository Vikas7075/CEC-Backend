import { User } from "../models/User.js";
import { ConnectionRequests } from "../models/connection.model.js";

export const sendConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user.userId;

        //check if user is exits
        const receiver = await User.findById(userId);
        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        //check if a connection request already exits
        const existingRequest = await ConnectionRequests.findOne({ sender: senderId, receiver: userId });
        if (existingRequest) {
            return res.status(400).json({ error: 'Connection request already sent' });
        }

        //create a new request
        const newRequest = await ConnectionRequests.create({
            sender: senderId,
            receiver: userId,
            status: 'pending'
        })
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { connectionRequests: newRequest._id } },
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        res.status(201).json(
            {
                message: 'Connection request sent successfully',
                newRequest,
                updatedUser
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// accept a connection request
export const acceptConnectionRequest = async (req, res) => {
    const users = req.user;
    try {
        const { requestId } = req.params;
        //update the status of the connection request to 'accepted'
        const connection = await ConnectionRequests.findByIdAndUpdate(requestId, { status: 'accepted' });
        // Update user's connections
        const updatedUser = await User.findOneAndUpdate(
            { _id: users.userId },
            { $push: { connections: connection._id } },
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        res.json({ message: 'Connection request accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//reject connection request
export const rejectConnectionrequest = async (req, res) => {
    const users = req.user;
    try {
        const { requestId } = req.params;
        //update the status of the connection request to 'rejected'
        await ConnectionRequests.findByIdAndUpdate(requestId, { status: 'rejected' });
        // Update user's connections
        const updatedUser = await User.findByIdAndUpdate(
            { _id: users.userId },
            { $pull: { connectionRequests: requestId } },
            { new: true }
        );

        if (!updatedUser) {
            console.error("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({ message: 'Connection request rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// get a user's connections
export const getConnections = async (req, res) => {
    try {
        const { userId } = req.params;
        //fetch all connection requests where user is the sender or request
        const connection = await ConnectionRequests.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .populate('sender', 'username headline profilePicture') // populate sender details
            .populate('receiver', 'username email');
        res.json(connection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
