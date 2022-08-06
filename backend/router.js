import express from 'express';
import multer from 'multer';

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
import chatController from './controllers/chatController.js';

const upload = multer({});

const router = express.Router();

// auth endpoints
router.post('/api/auth/signup', authController.signupUser);
router.post('/api/auth/login', authController.loginUser);
router.post('/api/auth/logout/:email', authController.logoutUser);
router.post('/api/auth/update/:email', upload.single('profilePicture'), authController.updateUser);

// event endpoints
router.get('/api/events', eventController.getAllEvents);
router.post('/api/events', upload.single('eventPhoto'), eventController.createEvent);
router.delete('/api/event/:id', eventController.deleteEventByID);
router.post('/api/event/:id/join', eventController.joinEvent);
router.post('/api/event/:id/leave', eventController.leaveEvent);
router.get('/api/event/:id/profilePictures', eventController.getProfilePictures);

// chat endpoints
router.get('/api/chats/:userId', chatController.getAllChatsWithUser);
router.post('/api/chats', chatController.createChat);
router.post('/api/chats/:chatId', chatController.createMessage);
router.get('/api/chats/messages/:chatId', chatController.getAllMessages);
router.get('/api/chats/senderInfo/:userId', chatController.getSenderInfo);

export default router;
