


var express = require('express');
var app = express();

app.use(express.static('public'));
//=================================================
const server = app.listen(5789, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("My app is listening at http://%s:%s", host, port)
});
