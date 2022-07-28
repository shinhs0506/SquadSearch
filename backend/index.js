import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import { Server } from 'socket.io';
import { createServer } from 'http';
import router from './router.js';
import applyPassportStrategy from './passport.js';

const upload = multer({});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.single('profilePicture'));

// mongodb
mongoose.connect('mongodb://localhost/cpsc455-SquadSearch', {});
const { connection } = mongoose;
connection.once('open', () => {
    console.log('connected to mongo database');
});

// passport middleware
applyPassportStrategy(passport);

// routes
app.use('/', router);

const port = 4000;
/*
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
*/

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', (socket) => {
    console.log('server side');
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});

httpServer.listen(port);
