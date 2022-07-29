import express from 'express';

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
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

router.get('/api/messages', messageController.getAllChats);

export default router;
