const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());
app.use('/', router.router);

const port = 4000;
app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`);
});
