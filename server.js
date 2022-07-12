/*******************************************************************
***  File Name		: server.js
***  Version		: V1.2
***  Designer		: 曾根 悠太
***  Date			: 2022.07.04
***  Purpose       	: サーバーの生成
***
*******************************************************************/
/*
*** Revision :
*** V1.0 : 曾根 悠太, 2022.06.14
*** V1.1 : 曾根 悠太, 2022.07.02
*** V1.2 : 曾根 悠太, 2022.07.04
*/

const express = require( 'express' );
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Matching = require('./libs/matching.js');
const reader = require('./libs/cardsReader.js');


reader.readCardsFile();


//exports
exports.io = io;


//serverを生成
var server = http.listen(80, "0.0.0.0", function() {
        console.log('%s: Node server started on %s:%d ...',Date(Date.now()),80);
        });

app.use( express.static( __dirname + '/public' ) );


app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const matching = new Matching();
matching.start(io);

