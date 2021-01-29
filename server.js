const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const Game = require('./Game.js');
const port = 3000;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({server});

// Create a game that is inactive
var game = new Game();

webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data){
        console.log("Message recieved: " + data);
        processMessage(data);

        // All clients will have a seperate session
        webSocketServer.clients.forEach(function each(client) {
            if(client != webSocket && client.readyState == WebSocket.OPEN) {
                // Send the data to the other client
                // client.send(data);
            }
        })
    });
});

server.listen(port, function(){
    console.log('Server is listening on port ' + port);
});

function processMessage(message) {
    var messageJSON = JSON.parse(message);
    console.log(messageJSON);

    if(messageJSON.type === 'SET_PLAYER_NAME'){
        console.log("Setting plauer name to " + messageJSON.player_name);
        var playerAdded = game.addPlayer(messageJSON.player_name);
        console.log(game);

        if(playerAdded) {
            // Send message to clients
        } else {
            // Error
            console.log(game);
        }
    }
}