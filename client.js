const WebSocket = require('ws');
const prompt = require('prompt-sync')();

// Server information
const hostname = 'localhost';
const port = 3000;

// Variable to store web socket
let myWebSocket;

// When starting the client:
// Prompt the player for a name
// Connect to the server
const name = prompt('What is your name?');
connectToServer(name);

// Makes a connection to the server
// Sends it a message to set the player's name
function connectToServer(name) {
    // Connect to the server
    if (myWebSocket) {
        myWebSocket.onerror = myWebSocket.onopen = myWebSocket.onclose = null;
        myWebSocket.close();
    }

    myWebSocket = new WebSocket('ws://' + hostname + ':' + port);

    // When the connection is opened:
    // Send the player name to ther server
    myWebSocket.onopen = () => {
        console.log('Trying to connect to game...');

        var message = {
            type: 'SET_PLAYER_NAME',
            player_name: name,
        };

        sendMessage(JSON.stringify(message));
    };

    // When a message is recieved from the server
    // The server sends special messages in the form of signals (e.g. YOUR_TURN)
    // Other data from the server is just printed out to the client console
    myWebSocket.onmessage = function (message) {
        if (message.data === 'YOUR_TURN') {
            promptForMove();
        } else if (message.data === 'INVALID_MOVE') {
            console.log('Invalid move');
            promptForMove();
        } else {
            // If there is no signal set
            console.log(message.data);
        }
    };

    // Inform the player when the connection drops
    myWebSocket.onclose = function () {
        console.log('You are disconnected from the server');
        myWebSocket = null;
    };
}

// Method to send data to the server
// The client sends special messages in the form of signals (e.g. YOUR_TURN)
// The signal is set to the type attribute
function sendMessage(message) {
    if (!myWebSocket) {
        console.log('You are disconnected from the server');
        return;
    } else {
        myWebSocket.send(message);
    }
}

// Prompt the user for their move
// The server determines whether or not this move is valid
function promptForMove() {
    var position = prompt('Your move:');
    makeTurn(position);
}

// Send a message to the server saying that
// the player wants to make a move to a certain position
function makeTurn(column) {
    var message = {
        type: 'MAKE_TURN',
        position: column,
    };

    // Send the player name to the server
    sendMessage(JSON.stringify(message));
}
