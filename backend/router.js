import express from 'express';
import eventController from './controllers/eventController.js';

const router = express.Router();

router.get('/api/events', eventController.getAllEvents);

export default router;
