const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Matching = require('./libs/Matching.js');


//serverを生成
var server = http.listen(8080, "127.0.0.1", function() {
        console.log('%s: Node server started on %s:%d ...',Date(Date.now()),8080);
        });

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const matching = new Matching();
matching.start(io);

