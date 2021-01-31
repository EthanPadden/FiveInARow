const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const Game = require('./Game.js');
const Player = require('./Player.js');

// Create server object
const port = 3000;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({ server });

// Create a game that is initially inactive
var game = new Game();

// When a message is received from the client:
// Process the data
webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data) {
        processMessage(data, webSocket);
    });

    // When a client connection drops
    webSocket.onclose = function () {
        console.log('A player has disconnected');
        myWebSocket = null;
        sendMessageToAllClients('DISCONNECT');
        game = new Game();
    };
});

// Start the server listening
server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});

// Process messages from clients
function processMessage(message, client) {
    // Types of messages from the clients are specified by the signals
    // The signals are values of the 'type' property
    var messageJSON = JSON.parse(message);

    // Log message to the console
    console.log('Message received:');
    console.log(messageJSON);

    // Choose action based on signal
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
                sendMessageToAllClients(game.board.toString());
                askPlayersForMove();
            }
        } else {
            // Send error message to the client and disconnect them
            client.send('Game is full');
            client.close();
        }
    } else if (messageJSON.type === 'MAKE_TURN') {
        // Check if there is an active game
        if (game.active) {
            // Check if it is that player's turn
            if (client === game.turn.client) {
                console.log(
                    game.turn.name +
                        ' has added a piece in column ' +
                        messageJSON.position
                );

                // The result can take on values 1, 0 or -1
                var result = game.makeMove(
                    messageJSON.position,
                    game.turn.number
                );

                if (result == 1) {
                    // This means the move was a winning move
                    sendMessageToAllClients(game.board.toString());
                    sendMessageToAllClients(game.turn.name + ' has won!');
                } else if (result == 0) {
                    // This means the move was not a winning move,
                    // but the move was successful (the input was valid)
                    sendMessageToAllClients(game.board.toString());
                    game.nextTurn();
                    askPlayersForMove();
                } else {
                    // The input was invalid
                    client.send('INVALID_MOVE');
                }
            } else {
                client.send('It is not your turn');
                askPlayersForMove();
            }
        } else {
            client.send('There is no game active');
        }
    }
}

// Sends data to all players in the game
function sendMessageToAllClients(message) {
    if (typeof game.player1 !== 'undefined') game.player1.client.send(message);
    if (typeof game.player2 !== 'undefined') game.player2.client.send(message);
}

// Specifies to all players who's turn it is
// Sends signal to the player who's turn it is to ask for a move
function askPlayersForMove() {
    sendMessageToAllClients('It is ' + game.turn.name + "'s move");
    game.turn.client.send('YOUR_TURN');
}
