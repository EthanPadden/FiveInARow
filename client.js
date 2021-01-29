const { send } = require('process');
const readline = require('readline');
const WebSocket = require('ws');
const hostname = 'localhost';
const port = 3000;

// Variable to store web socket
let myWebSocket;

// Create a CLI interface for user input
const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// When starting the client, prompt the player for a name
cliInterface.question('Enter name:', function (name) {
    cliInterface.close();
    connectToServer(name);
});

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
    myWebSocket.onmessage = ({ data }) => console.log(data);

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
        console.log('Sending message: ' + message);
    }
}
