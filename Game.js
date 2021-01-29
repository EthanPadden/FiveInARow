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
            this.active = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Game;
