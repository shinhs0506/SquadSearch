import express from 'express';
import router from './router.js';

const app = express();
app.use(express.json());
app.use('/', router);

const port = 4000;
app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`);
});
