import express from 'express';
import multer from 'multer';
import jwtDecode from 'jwt-decode';

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
import chatController from './controllers/chatController.js';
import messageController from './controllers/messageController.js';

const upload = multer({});

const router = express.Router();

// token verify
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (typeof token !== 'undefined') {
        const [, bearerToken] = token.split(' ');
        req.token = bearerToken;
        const decodedData = jwtDecode(req.token);
        const { _id, exp } = decodedData;

        if (Date.now() >= exp * 1000) {
            return res.status(401).send({ message: 'login status expired' });
        }

        req.userId = _id;
        return next();
    }
    return res.status(401).send({ message: 'Authorization header missing' });
}

// auth endpoints
router.post('/api/auth/signup', authController.signupUser);
router.post('/api/auth/login', authController.loginUser);
router.post('/api/auth/forceLogin', verifyToken, authController.forceLoginUser);
router.post('/api/auth/logout/', verifyToken, authController.logoutUser);
router.post('/api/auth/update/', verifyToken, upload.single('profilePicture'), authController.updateUser);

// event endpoints
router.get('/api/events', verifyToken, eventController.getAllEvents);
router.post('/api/events', verifyToken, upload.single('eventPhoto'), eventController.createEvent);
router.delete('/api/event/:id', verifyToken, eventController.deleteEventByID);
router.post('/api/event/:id/join', verifyToken, eventController.joinEvent);
router.post('/api/event/:id/leave', verifyToken, eventController.leaveEvent);
router.get('/api/event/:id/profilePictures', verifyToken, eventController.getProfilePictures);

// chat endpoints
router.get('/api/chats/:userId', chatController.getAllChatsWithUser);
router.post('/api/chats', chatController.createChat);

// message endpoints
router.get('/api/messages/:chatId', messageController.getMessagesByChatId);
router.post('/api/messages', messageController.createMessage);

export default router;
