const Board = require('./Board.js');

class Game {
    constructor() {
        this.active = false;
        this.board = new Board();
    }

    /**
     * Adds a player to the game
     * @param {*} player : the Player object to be added to the game
     * @returns : true if the player was added succesfully, false if the game is full
     */
    addPlayer(player) {
        if (typeof this.player1 == 'undefined') {
            // If there is no player 1 yet, set this player to be player 1
            this.player1 = player;
            this.player1.setPlayerNumber(1);

            // The player was added successfully
            return true;
        } else if (typeof this.player2 == 'undefined') {
            // If there is a player 1 already, set this player to be player 2
            this.player2 = player;
            this.player2.setPlayerNumber(2);

            // The game is now full and can be started
            this.startGame();

            return true;
        } else {
            // The game is already full, so the player was not added successfully
            return false;
        }
    }

    /**
     * Sets the game state to active
     * Specifies that it is player 1's turn
     */
    startGame() {
        this.active = true;
        this.turn = this.player1;
    }

    /**
     * Check who's turn it is currently
     * Sets the turn to the other player
     */
    nextTurn() {
        if (this.turn === this.player1) this.turn = this.player2;
        else this.turn = this.player1;
    }

    /**
     * Checks whether an input position to the game is a valid move
     * @param {*} positionStr : a string representation of the position (1-9)
     * @returns : true if the move is valid (conditions specified in method body)
     */
    isValidMove(positionStr) {
        if (isNaN(positionStr)) {
            // Check if the string is a number
            console.log('Position is not a number');
            return false;
        } else {
            var positionFloat = parseFloat(positionStr);
            if (!Number.isInteger(positionFloat)) {
                // Check if the string is an integer
                console.log('Position is not an integer');
                return false;
            } else {
                // Convert the float to an integer
                var position = Math.round(positionFloat);

                if (positionFloat < 1 || position > 9) {
                    // Check if the position is in the correct range
                    console.log('Position is not in the correct range');
                    return false;
                } else {
                    if (!this.board.sqaureisEmpty(1, position)) {
                        // Check if the top square of the column is empty
                        console.log('No room left in column');
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * Adds a game piece into a specified column as a move by the specified player
     * @param {*} column : the column number to place the piece in (not zero-indexed)
     * @param {*} playerNumber : the player number who is making the move (1 or 2)
     * @returns true if move was successful, false if the move was invalid
     */
    makeMove(column, playerNumber) {
        if (this.isValidMove(column)) {
            // If the move is valid
            // Add a game piece to the next empty sqare of the board in that column
            var row = this.board.nextEmptySquareInColumn(column);
            this.board.addGamePiece(row, column, playerNumber);

            // Check was this a winning move
            var hasWon = this.board.checkForWinner(row, column, playerNumber);

            if (hasWon) {
                // If it was a winning move:
                // Set the game as inactive
                this.active = false;
                // Return a signal to show it was a winning move
                return 1;
            } else {
                // If it was not a winning move:
                // Return a signal to show it was not winning move, but was successful (valid and executed)
                return 0;
            }
        } else {
            // Signal that the move was invalid
            return -1;
        }
    }
}

module.exports = Game;
