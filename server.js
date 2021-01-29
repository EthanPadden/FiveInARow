const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const Game = require('./Game.js');
const port = 3000;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({server});

// Create a game that is inactive
var game = new Game();
CLIENTS=[];

webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data){
        CLIENTS.push(webSocket);

        console.log("Message recieved: " + data);
        processMessage(data);
        
    });
});

server.listen(port, function(){
    console.log('Server is listening on port ' + port);
});

function processMessage(message) {
    var messageJSON = JSON.parse(message);
    console.log(messageJSON);

    if(messageJSON.type === 'SET_PLAYER_NAME'){
        console.log("Setting player name to " + messageJSON.player_name);
        var playerAdded = game.addPlayer(messageJSON.player_name);
        console.log(game);

        if(playerAdded) {
            sendMessageToAllClients("Player added: " + messageJSON.player_name);
        } else {

            CLIENTS.pop().send("Game is full");

        }
    }
}

function sendMessageToAllClients(message) {
    for (var i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send(message);
    }
}