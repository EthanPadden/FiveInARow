const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const Game = require('./Game.js');
const Player = require('./Player.js');

const port = 3000;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({ server });

// Create a game that is inactive
var game = new Game();

webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data) {
        console.log('Message recieved: ' + data);
        processMessage(data, webSocket);
    });
});

server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});

function processMessage(message, webSocket) {
    var messageJSON = JSON.parse(message);
    console.log(messageJSON);

    if (messageJSON.type === 'SET_PLAYER_NAME') {
        console.log('Setting player name to ' + messageJSON.player_name);
        var playerAdded = game.addPlayer(
            new Player(webSocket, messageJSON.player_name)
        );

        if (playerAdded) {
            sendMessageToAllClients('Player added: ' + messageJSON.player_name);
        } else {
            webSocket.send('Game is full');
        }
    }
}

function sendMessageToAllClients(message) {
    if (typeof game.player1 !== 'undefined') game.player1.client.send(message);
    if (typeof game.player2 !== 'undefined') game.player2.client.send(message);
}
