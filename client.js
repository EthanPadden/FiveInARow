const { send } = require('process');
const readline = require('readline');
const WebSocket = require('ws');
const hostname = 'localhost';
const port = 3000;
var playerName = null;

let myWebSocket;
const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

cliInterface.question('Enter name:', function (name) {
    cliInterface.close();

    // Start next here
    init(name);
});


function init(name) {
    if (myWebSocket) {
        myWebSocket.onerror = myWebSocket.onopen = myWebSocket.onclose = null;
        myWebSocket.close();
    }

    myWebSocket = new WebSocket('ws://' + hostname + ':' + port);
    myWebSocket.onopen = () => {
        console.log('Trying to connect to game...');
        var message = {
            type: 'SET_PLAYER_NAME',
            player_name: name,
        };
        sendMessage(JSON.stringify(message));
    };

    myWebSocket.onmessage = ({ data }) => console.log(data);
    myWebSocket.onclose = function () {
        console.log('Connection closed');

        myWebSocket = null;
    };
}

function sendMessage(message) {
    if (!myWebSocket) {
        console.log('Disconnected from game');
        return;
    } else {
        myWebSocket.send(message);
        console.log('Sending message: ' + message);
    }
}

// Start the connection to the server
// init();
