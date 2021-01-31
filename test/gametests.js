const assert = require('chai').assert;
const Game = require('../Game.js');
const Player = require('../Player.js');

describe('Horizontal wins', function () {
    describe('Horizontal win from left column', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            game.addPlayer(player1);
            game.addPlayer(player2);

            var result;
    
            for (var i = 1; i <= 4; i++) {
                result = game.makeMove(i, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(i, player2.number);
                assert.equal(result, 0);
            }
    
            result = game.makeMove(5, player1.number);
            assert.equal(result, 1);
        });
    });
    
    describe('Horizontal win from last column', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            var result;
    
            for (var i = 5; i <= 8; i++) {
                result = game.makeMove(i, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(i, player2.number);
                assert.equal(result, 0);
    
            }
    
            result = game.makeMove(9, player1.number);
            assert.equal(result, 1);
        });
    });
    
    describe('Horizontal win from arbitrary column', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            game.addPlayer(player1);
            game.addPlayer(player2);

            var result;
    
            for (var i = 3; i <= 6; i++) {
                result = game.makeMove(i, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(i, player2.number);
                assert.equal(result, 0);
    
            }
    
            result = game.makeMove(7, player1.number);
            assert.equal(result, 1);
        });
    });
    
});

describe('Vertical wins', function () {
    describe('Vertical win in row 2', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            game.addPlayer(player1);
            game.addPlayer(player2);

            var result;
    
            for (var i = 1; i <= 4; i++) {
                result = game.makeMove(1, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(2, player2.number);
                assert.equal(result, 0);
            }

    
            result = game.makeMove(1, player1.number);
            assert.equal(result, 1);
        });
    });
    
    describe('Vertical win in top row', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            var result;

            result = game.makeMove(3, player1.number);
            assert.equal(result, 0);

    
            for (var i = 1; i <= 4; i++) {
                result = game.makeMove(2, player2.number);
                assert.equal(result, 0);
    
                result = game.makeMove(1, player1.number);
                assert.equal(result, 0);
            }
    
            result = game.makeMove(3, player2.number);
            assert.equal(result, 0);

            result = game.makeMove(1, player1.number);
            assert.equal(result, 1);
        });
    });
    
})


describe('Diagonal wins - positive slope', function () {
    describe('Diagonal win from bottom left corner', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            result = game.makeMove(1, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);

            result = game.makeMove(5, player1.number);
            assert.equal(result, 1);
        });
    });

    describe('Diagonal win from column 5 to last column', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            result = game.makeMove(5, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(9, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(9, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(9, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(9, player2.number);
            assert.equal(result, 0);

            result = game.makeMove(9, player1.number);
            assert.equal(result, 1);
        });
    });
});


describe('Diagonal wins - negative slope', function () {
    describe('Diagonal win from bottom right corner', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            result = game.makeMove(9, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(8, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(7, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(6, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(5, player2.number);
            assert.equal(result, 0);
           

            result = game.makeMove(5, player1.number);
            assert.equal(result, 1);
        });
    });
    
    describe('Diagonal win from column 5 to first column', function () {
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');
    
            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);
    
            result = game.makeMove(5, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(4, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(3, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(1, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(2, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(1, player2.number);
            assert.equal(result, 0);
            result = game.makeMove(1, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(1, player2.number);
            assert.equal(result, 0);

            result = game.makeMove(1, player1.number);
            assert.equal(result, 1);
        });
    });
});
