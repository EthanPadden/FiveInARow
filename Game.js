const Player = require('./Player.js');
const Board = require('./Board.js');

class Game {
    constructor() {
        this.active = false;
        this.board = new Board();
    }

    addPlayer(player) {
        if (typeof this.player1 == 'undefined') {
            this.player1 = player;
            return true;
        } else if (typeof this.player2 == 'undefined') {
            this.player2 = player;
            this.startGame();
            return true;
        } else {
            return false;
        }
    }

    startGame() {
        this.active = true;
        this.turn = this.player1;
    }

    nextTurn() {
        if (this.turn === this.player1) this.turn = this.player2;
        else this.turn = this.player1;
    }

    // Assumes the position is a string value passed from the client
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
                    // Check if the top square of the column is empty
                    if (!this.board.sqaureisEmpty(1, position)) {
                        console.log('No room left in column');

                        return false;
                    }
                }
            }
        }
        return true;
    }
}

module.exports = Game;
