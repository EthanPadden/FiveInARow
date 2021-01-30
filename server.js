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
function processMessage(message, client) {
    // Types of messages from the clients are specified by the 'type' property
    var messageJSON = JSON.parse(message);
    console.log(messageJSON);

    if (messageJSON.type === 'SET_PLAYER_NAME') {
        console.log('Setting player name to ' + messageJSON.player_name);

        // playerAdded is true if the game is not full (ie the player was added successfully)
        var playerAdded = game.addPlayer(
            new Player(client, messageJSON.player_name)
        );

        if (playerAdded) {
            sendMessageToAllClients('Player added: ' + messageJSON.player_name);

            // If the game has started (ie 2 players are added)
            if (game.active) {
                sendMessageToAllClients('Game has started...');
                console.log(game.board.toString());
                askPlayersForMove();
            }
        } else {
            client.send('Game is full');
            client.close();
        }
    } else if (messageJSON.type === 'MAKE_TURN') {
        // Check if it is that player's turn
        if (client === game.turn.client) {
            console.log(
                game.turn.name + ' has added disc at ' + messageJSON.position
            );

            var success = game.makeMove(messageJSON.position, game.turn.number);

            if(success){
                console.log(game.board.toString());
                game.nextTurn();
                askPlayersForMove();
            } else {
                client.send('INVALID_MOVE');
            }
            
        } else {
            client.send('It is not your turn');
            askPlayersForMove();
        }
    }
}

function sendMessageToAllClients(message) {
    if (typeof game.player1 !== 'undefined') game.player1.client.send(message);
    if (typeof game.player2 !== 'undefined') game.player2.client.send(message);
}

function askPlayersForMove() {
    sendMessageToAllClients('It is ' + game.turn.name + '\'s move');
    game.turn.client.send('YOUR_TURN');
}