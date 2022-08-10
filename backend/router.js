import express from 'express';
import multer from 'multer';
import jwtDecode from 'jwt-decode';

import eventController from './controllers/eventController.js';
import authController from './controllers/authController.js';
import chatController from './controllers/chatController.js';
import userController from './controllers/userController.js';

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
router.post('/api/event/:eventId/addChat', verifyToken, eventController.addChat);
router.get('/api/event/:eventId/getAllChats', verifyToken, eventController.getAllChats);

// chat endpoints
router.get('/api/chats', verifyToken, chatController.getAllChats);
router.get('/api/chats/:userId', verifyToken, chatController.getAllPrivateChats);
router.post('/api/chats', verifyToken, chatController.createChat);
router.post('/api/chats/privateChat', verifyToken, chatController.createPrivateChat);
router.post('/api/chats/:chatId', verifyToken, chatController.createMessage);
router.get('/api/chats/messages/:chatId', verifyToken, chatController.getAllMessages);
router.get('/api/chats/senderInfo/:userId', verifyToken, chatController.getSenderInfo);
router.post('/api/chats/:eventId/join', verifyToken, chatController.joinChats);
router.delete('/api/chats/:chatId', verifyToken, chatController.deleteChat);

// user endpoints
router.get('/api/users/:userId/getProfile', verifyToken, userController.getProfile);

export default router;
