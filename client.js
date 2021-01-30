const { send } = require('process');
const readline = require('readline');
const WebSocket = require('ws');
const hostname = 'localhost';
const prompt = require('prompt-sync')();

const port = 3000;

// Variable to store web socket
let myWebSocket;

// Create a CLI interface for user input
const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// When starting the client, prompt the player for a name
// cliInterface.question('Enter name:', function (name) {
//     cliInterface.close();
//     connectToServer(name);
// });
const name = prompt('What is your name?');
connectToServer(name);

function connectToServer(name) {
    // Connect to the server
    if (myWebSocket) {
        myWebSocket.onerror = myWebSocket.onopen = myWebSocket.onclose = null;
        myWebSocket.close();
    }

    myWebSocket = new WebSocket('ws://' + hostname + ':' + port);

    // When the connection is opened
    myWebSocket.onopen = () => {
        console.log('Trying to connect to game...');

        var message = {
            type: 'SET_PLAYER_NAME',
            player_name: name,
        };

        // Send the player name to the server
        sendMessage(JSON.stringify(message));
    };

    // Log messages from the server to the console
    // myWebSocket.onmessage = ({ data }) => console.log(data);
    myWebSocket.onmessage = function (message) {
        if (message.data === 'YOUR_TURN') {
            promptForMove();
        } else if (message.data === 'INVALID_MOVE') {
            console.log('Invalid move');
            promptForMove();
        } else {
            console.log(message.data);
        }
    };

    // Inform the player when the connection drops
    myWebSocket.onclose = function () {
        console.log('Connection closed');
        myWebSocket = null;
    };
}

// Method to send data to the server
function sendMessage(message) {
    if (!myWebSocket) {
        console.log('Disconnected from game');
        return;
    } else {
        myWebSocket.send(message);
    }
}

function promptForMove() {
    var position = prompt('Your move:');

    makeTurn(position);
}

function makeTurn(column) {
    var message = {
        type: 'MAKE_TURN',
        position: column,
    };

    // Send the player name to the server
    sendMessage(JSON.stringify(message));
}
