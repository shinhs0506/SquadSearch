import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import router from './router.js';
import applyPassportStrategy from './passport.js';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongodb
mongoose.connect('mongodb://localhost/cpsc455-SquadSearch', {});
const { connection } = mongoose;
connection.once('open', () => {
    // console.log('connected to mongo database')
});

// passport middleware
applyPassportStrategy(passport);

// routes
app.use('/', router);

const port = 4000;
app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`);
});
