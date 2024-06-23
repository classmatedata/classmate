
import dotenv from 'dotenv'
import express from 'express';

dotenv.config();
let app = express();

app.use(express.static('www'));
//=================================================
const server = app.listen(process.env.SERVER_PORT, process.env.HOST, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("My app is listening at http://%s:%s", host, port)
});
