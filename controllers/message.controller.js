import { User } from "../models/User.js";
import Message from "../models/Chat/message.model.js";
import Chat from '../models/Chat/chat.model.js'


//create a chat 
export const createChat = async (req, res) => {
    try {
        const { participant } = req.body; // User ID of the other participant

        // Check if participant ID is provided
        if (!participant) {
            return res.status(400).json({
                message: "Participant ID is required"
            });
        }

        // Check if the participant exists
        const isValidParticipant = await User.findById(participant);
        if (!isValidParticipant) {
            return res.status(400).json({
                message: "Invalid participant ID"
            });
        }

        // Check if a chat already exists between the two participants
        const existingChat = await Chat.findOne({ participants: { $all: [req.user.userId, participant] } });
        if (existingChat) {
            return res.status(400).json({
                message: "Chat already exists with this participant"
            });
        }

        // Create a new chat
        const newChat = await Chat.create({ participants: [req.user.userId, participant] });
        return res.status(201).json(newChat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


//send message
export const sendMessage = async (req, res) => {
    try {
        const { chatId, text } = req.body;

        // Check if chatId is provided
        if (!chatId || !text) {
            return res.status(400).json({ error: 'chatId and text not found' });
        }

        // Check if the chat exists
        const existingChat = await Chat.findById(chatId);
        if (!existingChat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        // Create a new message with the authenticated user as the sender
        const newMessage = await Message.create({ chat: chatId, sender: req.user.userId, text });

        // Update the lastMessage field in the chat
        await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage });

        // Populate the newMessage object with sender details
        await newMessage.populate('sender', 'username');

        return res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



//get chat history
export const getChatHistory = async (req, res) => {
    try {
        const { chatId } = req.params;

        //fetch message to given chat 
        const message = await Message.find({ chat: chatId }).populate('sender', 'username profilePicture');
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//get all chats
export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate('participants', 'username profilePicture').populate('lastMessage', 'text');
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//fetch message
export const getMessage = async (req, res) => {
    try {
        const { userId } = req.params;
        //fetch message where the user is either sender or receiver
        const message = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] }).
            populate('sender', 'username').
            populate('receiver', 'username');

        // socket.emit('messages', message);
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//mark a message as read
export const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        //update message status to 'read'
        const updatedMessage = await Message.findByIdAndUpdate(messageId, { status: 'read' }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message Not Found!' });
        }
        res.json({ message: 'Message mark as read', data: updatedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete a message
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        //delete the message
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}