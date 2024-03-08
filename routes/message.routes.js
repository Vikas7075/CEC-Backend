import express from 'express';
import { createChat, deleteMessage, getAllChats, getChatHistory, getMessage, markMessageAsRead, sendMessage } from '../controllers/message.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post('/chats', verifyToken, createChat); // Use /chats to create a chat
router.post('/send', verifyToken, sendMessage); // Use /send to send a message
router.get('/chats/:chatId', verifyToken, getChatHistory);// Use /chats/:chatId to get chat history
router.get('/chats', verifyToken, getAllChats); // Get all chats
router.get('/:userId', verifyToken, getMessage); // Use /messages/:userId to get messages for a user
router.put('/:messageId/read', verifyToken, markMessageAsRead); // Use /messages/:messageId/read to mark a message as read
router.delete('/:messageId', verifyToken, deleteMessage); // Use /messages/:messageId to delete a message


export default router;