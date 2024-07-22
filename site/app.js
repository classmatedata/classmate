const express = require('express');
const routerAuth = require("./routes/routes_auth");
const routerCourses = require("./routes/routes_course");
const routerLang = require("./routes/routes_lang");
const routerGender = require("./routes/routes_gender");
//const routerTest = require("./routes/routes");
const routerUsers = require("./routes/routes_user");

const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 10000;
const HOST = process.env.HOST || 'localhost';




const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static(process.env.SITE_TO_DISPLAY));
//app.use(express.static('public'));

app.use('/api/auth', routerAuth);
app.use('/api/users', routerUsers);
app.use('/api/course', routerCourses);
app.use('/api/lang', routerLang);
app.use('/api/gender', routerGender);
//app.use('/api/test', routerTest);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} run http://${HOST}:${PORT}`);
});