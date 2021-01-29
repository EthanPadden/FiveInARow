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

// When a message is received from the client
webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data) {
        console.log('Message recieved: ' + data);
        processMessage(data, webSocket);
    });
});

// Start the server listening
server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});

// Process messages from clients
function processMessage(message, webSocket) {
    // Types of messages from the clients are specified by the 'type' property
    var messageJSON = JSON.parse(message);
    console.log(messageJSON);

    if (messageJSON.type === 'SET_PLAYER_NAME') {
        console.log('Setting player name to ' + messageJSON.player_name);

        // playerAdded is true if the game is not full (ie the player was added successfully)
        var playerAdded = game.addPlayer(
            new Player(webSocket, messageJSON.player_name)
        );

        if (playerAdded) {
            sendMessageToAllClients('Player added: ' + messageJSON.player_name);

            // If the game has started (ie 2 players are added)
            if(game.active) {
                console.log(game.board);
                sendMessageToAllClients('Game has started...');
            }
        } else {
            webSocket.send('Game is full');
            webSocket.close();
        }
    }
}

function sendMessageToAllClients(message) {
    if (typeof game.player1 !== 'undefined') game.player1.client.send(message);
    if (typeof game.player2 !== 'undefined') game.player2.client.send(message);
}
