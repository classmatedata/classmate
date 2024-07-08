const express = require('express');
const routerAuth = require("./src/app/routes");
const routerCourses = require("./src/data/courses/routes");
const routerLang = require("./src/data/lang/routes");
const routerTest = require("./src/data/test/routes");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 10000;
const HOST = process.env.HOST || 'localhost';



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

app.use('/api/auth', routerAuth);

app.use('/api/courses', routerCourses);
app.use('/api/lang', routerLang);

app.use('/api/test', routerTest);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} run http://${HOST}:${PORT}`);
});