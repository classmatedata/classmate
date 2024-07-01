const express = require('express');
const router = require("./src/app_routers");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.use(router)

console.log(router);




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} run http://${HOST}:${PORT}`);
});