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
    
            for (var i = 1; i <= 4; i++) {
                result = game.makeMove(i, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(i, player2.number);
                assert.equal(result, 0);
            }
    
            var result = game.makeMove(5, player1.number);
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
    
            var result = game.makeMove(9, player1.number);
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
    
            for (var i = 3; i <= 6; i++) {
                result = game.makeMove(i, player1.number);
                assert.equal(result, 0);
    
                result = game.makeMove(i, player2.number);
                assert.equal(result, 0);
    
            }
    
            var result = game.makeMove(7, player1.number);
            assert.equal(result, 1);
        });
    });
    
})
