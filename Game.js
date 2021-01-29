const Player = require('./Player.js');

class Game {
    constructor() {
        this.active = false;
    }

    addPlayer(player) {
        if (typeof this.player1 == 'undefined') {
            this.player1 = player;
            return true;
        } else if (typeof this.player2 == 'undefined') {
            this.player2 = player;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Game;
