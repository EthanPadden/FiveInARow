const emptySqaure = '[ ]';

// Index 0 for player 1, index 1 for player 2
const gamePieces = ['[X]', '[O]'];

class Board {
    constructor() {
        this.board = new Array();

        // Build up an empty board of 6 empty rows
        for (var i = 0; i < 6; i++) {
            this.board.push(
                new Array(
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure,
                    emptySqaure
                )
            );
        }
    }

    toString() {
        var boardStr = '';

        // The board is an array of rows
        for (var i = 0; i < this.board.length; i++) {
            var rowStr = '';
            var rowArr = this.board[i];
            for (var j = 0; j < rowArr.length; j++) {
                rowStr += rowArr[j];
            }

            boardStr += rowStr + '\n';
        }

        return boardStr;
    }

    // Not zero indexed
    sqaureisEmpty(row, column) {
        var row = this.board[row - 1];
        return row[column - 1] === emptySqaure;
    }

    // Input is assumed to be valid (an integer in the correct range, not zero indexed)
    nextEmptySquareInColumn(column) {
        // Start from the bottom of the board, and return the (non zero-indexed) row number
        for (var i = this.board.length - 1; i >= 0; i--) {
            if (this.sqaureisEmpty(i + 1, column)) return i + 1;
        }
    }

    // Assumes that the square is empty
    // Arguments are not zero indexed
    // Rows start from the top row at 1
    // Columns start from the left at 1
    // playerNumber is either 1 or 2
    addGamePiece(row, column, playerNumber) {
        // console.log('PLYAER: ' + playerNumber);
        var rowArr = this.board[row - 1];
        // console.log(row);
        // console.log(rowArr);
        rowArr[column - 1] = gamePieces[playerNumber - 1];

        // console.log(rowArr);

        this.board[row - 1] = rowArr;
        // console.log(this.board);
    }

    checkForWinner(row, column, playerNumber) {
        return this.checkForWinnerHorizontally(row, playerNumber);
    }

    checkForWinnerHorizontally(row, playerNumber) {
        var rowArr = this.board[row - 1];
        var hasWon = false;

        // FIND THE FIRST PLAYER PIECE IN THE ROW:
        // Start at the beginning of the row
        var targetPiece = gamePieces[playerNumber-1];
        var i = 0;
        while(i < 5){ 
            if(rowArr[i] == targetPiece) {
                break;
            }
            i++;
        }

        // If the player's piece was not found in the first 5 columns,
        // they have not won in that row
        if(i == 5) return hasWon;

        var inARow = 1;
        i++;
        
        while(i < rowArr.length) {
            if(rowArr[i] == targetPiece) {
                inARow++;
            
            } else {
                // Reset and continue for next column
                inARow = 0;
            }
            i++;
            if (inARow == 5) hasWon = true;

        }

        return hasWon;
    }
}

module.exports = Board;
