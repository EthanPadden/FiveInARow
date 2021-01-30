class Player {
    constructor(client, name) {
        this.client = client;
        this.name = name;
    }

    setPlayerNumber(number) {
        this.number = number;
    }
}

module.exports = Player;
