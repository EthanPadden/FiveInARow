class Game {
    constructor() {
        this.active = false;
    }

    addPlayer(name) {
        if (typeof this.player1 == 'undefined') {
            this.player1 = name;
            return true;
        } else  if (typeof this.player2 == 'undefined') {
            this.player2 = name;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Game;