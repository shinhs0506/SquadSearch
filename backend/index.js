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

const port = process.env.PORT || 4000;

const upload = multer({});

const app = express();

const corsOptions = {
    origin: ['https://cpsc455-squadsearch-frontend.herokuapp.com', 'http://localhost:3000'],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.single('profilePicture'));

// mongodb
const mongoURL = (process.env.NODE_ENV || 'development') === 'development'
    ? 'mongodb://localhost'
    : 'mongodb+srv://squadsearch:squadsearch@cluster0.ostcb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { dbName: 'cpsc455-squadsearch'});
const { connection } = mongoose;
connection.once('open', () => {
    console.log('connected to mongo database');
});

// passport middleware
applyPassportStrategy(passport);

// routes
app.use('/', router);

/*
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
*/

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['https://cpsc455-squadsearch-frontend.herokuapp.com', 'http://localhost:3000'],
    },
});

io.on('connection', (socket) => {
    console.log('server side');
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});

httpServer.listen(port);
