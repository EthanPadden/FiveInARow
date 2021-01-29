const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const port = 3000;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data){
        console.log("Message recieved: " + data);
        // All clients will have a seperate session
        webSocketServer.clients.forEach(function each(client) {
            if(client != webSocket && client.readyState == WebSocket.OPEN) {
                // Send the data to the other client
                client.send(data);
            }
        })
    });
});

server.listen(port, function(){
    console.log('Server is listening on port ' + port);
});