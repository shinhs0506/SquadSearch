import express from 'express';
import multer from 'multer';
import jwtDecode from 'jwt-decode'

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
import chatController from './controllers/chatController.js';
import messageController from './controllers/messageController.js';

const upload = multer({});

const router = express.Router();

// token verify
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log('header: ', req.headers);
    if (typeof token !== undefined) {
        req.token = token.split(' ')[1];
        const decodedData = jwtDecode(req.token);
        const { user, exp } = decodedData;

        if (Date.now() >= exp * 1000) {
            return res.status(401).send({ message: 'login status expired' });
        }

        req.user = user;
        next();
    } else {
        return res.status(401).send({ message: 'Authorization header missing' });
    }
}

// auth endpoints
router.post('/api/auth/signup', authController.signupUser);
router.post('/api/auth/login', authController.loginUser);
router.post('/api/auth/logout/', verifyToken, authController.logoutUser);
router.post('/api/auth/update/', verifyToken, upload.single('profilePicture'), authController.updateUser);

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

// message endpoints
router.get('/api/messages/:chatId', messageController.getMessagesByChatId);
router.post('/api/messages', messageController.createMessage);

export default router;
