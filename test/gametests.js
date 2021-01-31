const assert = require('chai').assert;
const Game = require('../Game.js');
const Player = require('../Player.js');

describe('Horizontal wins', function () {
    describe('Horizontal win from left column', function () {
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [O][O][O][O][ ][ ][ ][ ][ ]        
            [X][X][X][X][X][ ][ ][ ][ ]   
        */
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
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][O][O][O][O][ ]
            [ ][ ][ ][ ][X][X][X][X][X]
        */
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
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]        
            [ ][ ][O][O][O][O][ ][ ][ ]
            [ ][ ][X][X][X][X][X][ ][ ]
        */
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
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]
            [X][ ][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
        */
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
        /** Testing scenario: 
            [X][ ][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [X][O][ ][ ][ ][ ][ ][ ][ ]
            [O][X][ ][ ][ ][ ][ ][ ][ ]
        */
       
        it('Player 1 should win the game', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            game.addPlayer(player1);
            game.addPlayer(player2);

            var result;

            result = game.makeMove(2, player1.number);
            assert.equal(result, 0);
            result = game.makeMove(1, player2.number);
            assert.equal(result, 0);
           
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
});

describe('Diagonal wins - positive slope', function () {
    describe('Diagonal win from bottom left corner', function () {
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]
            [ ][ ][ ][ ][X][ ][ ][ ][ ]
            [ ][ ][ ][X][O][ ][ ][ ][ ]
            [ ][ ][X][X][X][ ][ ][ ][ ]
            [ ][X][X][O][O][ ][ ][ ][ ]
            [X][O][O][O][O][ ][ ][ ][ ]
        */
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
         /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]
            [ ][ ][ ][ ][ ][ ][ ][ ][X]
            [ ][ ][ ][ ][ ][ ][ ][X][O]
            [ ][ ][ ][ ][ ][ ][X][X][X]
            [ ][ ][ ][ ][ ][X][X][O][O]
            [ ][ ][ ][ ][X][O][O][O][O]
        */
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
         /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]
            [ ][ ][ ][ ][X][ ][ ][ ][ ]
            [ ][ ][ ][ ][O][X][ ][ ][ ]
            [ ][ ][ ][ ][X][X][X][ ][ ]
            [ ][ ][ ][ ][O][O][X][X][ ]
            [ ][ ][ ][ ][O][O][O][O][X]         
        */
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
        /** Testing scenario: 
            [ ][ ][ ][ ][ ][ ][ ][ ][ ]
            [X][ ][ ][ ][ ][ ][ ][ ][ ]
            [O][X][ ][ ][ ][ ][ ][ ][ ]
            [X][X][X][ ][ ][ ][ ][ ][ ]
            [O][O][X][X][ ][ ][ ][ ][ ]
            [O][O][O][O][X][ ][ ][ ][ ]       
        */
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

describe('Individual moves', function () {
    describe('Invalid moves', function () {
        it('Invalid non-numerical input', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var initalBoardState = getCopyOfBoard(game.board);
            var newBoardState;

            result = game.makeMove('Not a number', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);

            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('a', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(null, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(undefined, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(true, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(false, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(
                new Player(null, 'Complex object, not a number'),
                player1.number
            );
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));
        });

        it('Invalid numerical input', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var initalBoardState = getCopyOfBoard(game.board);
            var newBoardState;

            result = game.makeMove('-1', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('0', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('10', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('100', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(-1, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(0, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(10, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(100, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('0.0', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove('1.1', player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(0.0, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));

            result = game.makeMove(1.1, player1.number);
            newBoardState = getCopyOfBoard(game.board);
            assert.equal(result, -1);
            assert.isTrue(compareBoardState(newBoardState, initalBoardState));
        });
    });

    describe('Valid moves', function () {
        it('Valid integers', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var playerNumber = 1;

            for (var i = 1; i <= 9; i++) {
                

                var initalBoardState = getCopyOfBoard(game.board);
                result = game.makeMove(i, playerNumber);
                var newBoardState = getCopyOfBoard(game.board);
                assert.equal(result, 0);
                assert.isNotTrue(compareBoardState(newBoardState, initalBoardState));
                playerNumber = playerNumber == 1? 2:1; 
            }
        });

        it('Valid integer strings', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var playerNumber = 1;

            for (var i = 1; i <= 9; i++) {
                var iStr = i.toString();
                var initalBoardState = getCopyOfBoard(game.board);
                result = game.makeMove(iStr, playerNumber);
                var newBoardState = getCopyOfBoard(game.board);
                assert.equal(result, 0);
                assert.isNotTrue(compareBoardState(newBoardState, initalBoardState));
                playerNumber = playerNumber == 1? 2:1; 
            }
        });

        it('Valid floats', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var playerNumber = 1;

            for (var i = 1.0; i <= 9.0; i++) {
                var initalBoardState = getCopyOfBoard(game.board);
                result = game.makeMove(i, playerNumber);
                var newBoardState = getCopyOfBoard(game.board);
                assert.equal(result, 0);
                assert.isNotTrue(compareBoardState(newBoardState, initalBoardState));
                playerNumber = playerNumber == 1? 2:1; 
            }
        });

        it('Valid float strings', function () {
            var game = new Game();
            var player1 = new Player(null, 'John');
            var player2 = new Player(null, 'Mary');

            var result;
            game.addPlayer(player1);
            game.addPlayer(player2);

            var playerNumber = 1;

            for (var i = 1.0; i <= 9.0; i++) {
                var iStr = i.toString();
                var initalBoardState = getCopyOfBoard(game.board);
                result = game.makeMove(iStr, playerNumber);
                var newBoardState = getCopyOfBoard(game.board);
                assert.equal(result, 0);
                assert.isNotTrue(compareBoardState(newBoardState, initalBoardState));
                playerNumber = playerNumber == 1? 2:1; 
            }
        });
    });
});

function compareBoardState(boardGrid1, boardGrid2) {
    var boardStatesAreEqual = true;

    // For every row in the board
    for (var rowNumber = 1; rowNumber <= 6; rowNumber++) {
        var rowArr1 = boardGrid1[rowNumber - 1];
        var rowArr2 = boardGrid2[rowNumber - 1];

        // For every column in the row
        for (var columnNumber = 1; columnNumber <= 9; columnNumber++) {
            if(rowArr1[columnNumber-1] != rowArr2[columnNumber-1]) {
                boardStatesAreEqual = false;
            }
        }
    }

    return boardStatesAreEqual;
}

function getCopyOfBoard(board) {
    var sourceBoard = board.board;
    var targetBoard = new Array();

     // For every row in the board
     for (var rowNumber = 1; rowNumber <= 6; rowNumber++) {
        var sourceRowArr = sourceBoard[rowNumber - 1];
        var targetRowArr = new Array();

        // For every column in the row
        for (var columnNumber = 1; columnNumber <= 9; columnNumber++) {
            // Copy the source sqaure into the target square by value
            targetRowArr.push(sourceRowArr[columnNumber-1]); 
        }

        // Add this row to the target board
        targetBoard.push(targetRowArr);
    }

    return targetBoard;
}
