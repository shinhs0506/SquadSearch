import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import { Server } from 'socket.io';
import { createServer } from 'http';
import router from './router.js';
import applyPassportStrategy from './passport.js';

const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: ['https://cpsc455-squadsearch-frontend.herokuapp.com', 'http://localhost:3000'],
    allowedHeaders: ['*'],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongodb
const mongoURL = (process.env.NODE_ENV || 'development') === 'development'
    ? 'mongodb://localhost'
    : 'mongodb+srv://squadsearch:squadsearch@cluster0.ostcb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { dbName: 'cpsc455-squadsearch' });
const { connection } = mongoose;
connection.once('open', () => {
    console.log('connected to mongo database');
});

// passport middleware
applyPassportStrategy(passport);

// routes
app.use('/', router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['https://cpsc455-squadsearch-frontend.herokuapp.com', 'http://localhost:3000'],
    },
});

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        socket.broadcast.to(data.room).emit('receive_message', data);
    });
    socket.on('join_room', (room) => {
        socket.join(room);
    });
});

httpServer.listen(port);
