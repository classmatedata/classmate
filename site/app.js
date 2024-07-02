const express = require('express');
const loginRouter = require("./src/app_routers");
const dataRouter = require("./src/data/routers");

const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 10000;
const HOST = process.env.HOST || 'localhost';



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

app.use('/api/f', loginRouter);
app.use('/api/data', dataRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} run http://${HOST}:${PORT}`);
});