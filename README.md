# FiveInARow

### How to use
* To start the server, open a command prompt in the directory and run 'node server'
* To start a client, open a command prompt in the directory and run 'node client'

### How it works
* The server sends messages to/receives messages from the client
* The server has a Game object, which holds player information, whether the game is active or not and handles the logic of which player's turn it is
* The Game object also has a Board object, which stores the grid as a 2D array
* Functions for interacting with the board and game are described in the comments
