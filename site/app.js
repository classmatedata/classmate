const express = require('express');
const routerAuth = require("./src/app/routes");
const routerCourses = require("./src/data/courses/routes");
const routerDBinit = require("./src/data/db_init/routes");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 10000;
const HOST = process.env.HOST || 'localhost';



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

app.use('/api/f', routerAuth);
app.use('/api/courses', routerCourses);
app.use('/api/init', routerDBinit);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} run http://${HOST}:${PORT}`);
});