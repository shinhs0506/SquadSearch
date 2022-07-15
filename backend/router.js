import express from 'express';
import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';

const router = express.Router();

// auth endpoints
router.post('/api/auth/signup', authController.signupUser);
router.post('/api/auth/login', authController.loginUser);
router.post('/api/auth/logout', authController.logoutUser);

// event endpoints
router.get('/api/events', eventController.getAllEvents);
router.post('/api/events', eventController.createEvent);
router.delete('/api/event/:id', eventController.deleteEventByID);

export default router;
