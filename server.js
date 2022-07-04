const express = require( 'express' );
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Matching = require('./libs/Matching.js');
const reader = require('./libs/cardsReader.js');


reader.readCardsFile();


//exports
exports.io = io;


//serverを生成
var server = http.listen(50580, "127.0.0.1", function() {
        console.log('%s: Node server started on %s:%d ...',Date(Date.now()),50580);
        });

app.use( express.static( __dirname + '/public' ) );


app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const matching = new Matching();
matching.start(io);

