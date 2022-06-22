const express = require('express');

const eventController = require('./controllers/eventController');

const router = express.Router();

router.get('/api/events', eventController.getAllEvents);

exports.router = router;
