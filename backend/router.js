import express from 'express';

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
import chatController from './controllers/chatController.js';
import messageController from './controllers/messageController.js';

const router = express.Router();

// auth endpoints
router.post('/api/auth/signup', authController.signupUser);
router.post('/api/auth/login', authController.loginUser);
router.post('/api/auth/logout/:email', authController.logoutUser);
router.post('/api/auth/update/:email', authController.updateUser);

// event endpoints
router.get('/api/events', eventController.getAllEvents);
router.post('/api/events', eventController.createEvent);
router.delete('/api/event/:id', eventController.deleteEventByID);

// chat endpoints
router.get('/api/chats/:userId', chatController.getAllChatsWithUser);
router.post('/api/chats', chatController.createChat);

//message endpoints
router.get('/api/messages/:chatId', messageController.getMessagesByChatId);
router.post('/api/messages', messageController.createMessage);

export default router;
