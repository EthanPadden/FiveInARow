const { send } = require('process');
const WebSocket = require('ws');
const hostname = 'localhost';
const port = 3000;

let myWebSocket;

function init() {
    if(myWebSocket) {
        myWebSocket.onerror = myWebSocket.onopen = myWebSocket.onclose = null;
        myWebSocket.close();
    }

    myWebSocket = new WebSocket('ws://' + hostname + ':' + port);
    myWebSocket.onopen = () => {
        console.log('Connected to game');
        sendMessage('Test message');
    }

    myWebSocket.onmessage = ({data}) => console.log("Message: " + data);
    myWebSocket.onclose = function () {
        console.log('Connection closed');

        myWebSocket = null;
    }
}

function sendMessage(message) {
    if(!myWebSocket) {
        console.log('Disconnected from game');
        return;
    } else {
        myWebSocket.send(message);
        console.log('Sending message: ' + message);
    }
}

init();
