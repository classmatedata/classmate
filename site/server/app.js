const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/database', (req, res) => {
    console.log("database requered");
    res.send("database listed here");
})
app.use(express.static('../www'));
//=========================
const port = process.env.PORT || 3001;
app.listen(port_num, function () {
    console.log(`My app is listening on port ${port}!`);
});
