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
        if(this.turn === this.player1) this.turn = this.player2;
        else this.turn = this.player1;
    }
}

module.exports = Game;
