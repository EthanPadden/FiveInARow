const emptySqaure = '[ ]';
// Game pieces for player 1 and 2 respectively
const gamePieces = ['[X]', '[O]'];

class Board {
    constructor() {
        this.board = new Array();

        // Build up an empty board of 6 empty rows
        for (var i = 0; i < 6; i++) {
            // For 6 rows, push an array of 9 squares
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

    /**
     * Override toString method
     */
    toString() {
        // String to be returned
        var boardStr = '';

        // For every row in the board
        for (var i = 0; i < this.board.length; i++) {
            // Each row is an array, so a string is build for each
            var rowStr = '';
            var rowArr = this.board[i];

            // For each sqare in the row, append to the row string
            for (var j = 0; j < rowArr.length; j++) {
                rowStr += rowArr[j];
            }

            // Append the row string to the board string on a new line
            boardStr += rowStr + '\n';
        }

        return boardStr;
    }

    /**
     * Checks if a particular sqaure is empty (the character is the empty sqaure character)
     * @param {*} row : The row number (integer in the valid range, not zero-indexed) to check
     * @param {*} column : The column number (integer in the valid range, not zero-indexed) to check
     */
    sqaureisEmpty(row, column) {
        var row = this.board[row - 1];
        return row[column - 1] === emptySqaure;
    }

    /**
     * Returns the (non zero-indexed) row number for the next empty space in a particular column
     * @param {*} column : The column number (integer in the valid range - where the column is not full, not zero-indexed)
     */
    nextEmptySquareInColumn(column) {
        // Start from the bottom of the board, and return the (non zero-indexed) row number
        for (var i = this.board.length - 1; i >= 0; i--) {
            if (this.sqaureisEmpty(i + 1, column)) return i + 1;
        }
    }

    /**
     * Sets the sqaure at a particular row and column to be the game piece of the player who's number is in the
     * This assumes that the square is empty, otherwise it will override the piece that is already there
     * (i.e. it must be verified that the square is empty before calling this method)
     * @param {*} row : The column number (integer in the valid range, not zero-indexed)
     * @param {*} column : The column number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player number who's piece is to be placed (1 or 2)
     */
    addGamePiece(row, column, playerNumber) {
        // Get the row as an array
        var rowArr = this.board[row - 1];

        // Set the square at the correct column number to be the player's piece
        rowArr[column - 1] = gamePieces[playerNumber - 1];

        // Set this updated row back in the board
        this.board[row - 1] = rowArr;
    }

    /**
     * Calls 4 different methods corresponding to checking the 4 different ways a player can win
     * Checks if the move was a winning move
     * @param {*} row : The row number (integer in the valid range, not zero-indexed)
     * @param {*} column : The column number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player number who made the move (1 or 2)
     * @returns true if at least one of the conditions for a win are met
     */
    checkForWinner(row, column, playerNumber) {
        var horizontalWin = this.checkForWinnerHorizontally(row, playerNumber);
        var verticalWin = this.checkForWinnerVertically(column, playerNumber);
        var diagonalWinPositiveSlope = this.checkForWinnerDiagonallyPositiveSlope(
            row,
            column,
            playerNumber
        );
        var diagonalWinNegativeSlope = this.checkForWinnerDiagonallyNegativeSlope(
            row,
            column,
            playerNumber
        );
        return (
            horizontalWin ||
            verticalWin ||
            diagonalWinPositiveSlope ||
            diagonalWinNegativeSlope
        );
    }

    /**
     * Checks if the player specified by the player number has 5 pieces in a row in the specified row
     * @param {*} row : The row number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player whose piece to check (1 or 2)
     */
    checkForWinnerHorizontally(row, playerNumber) {
        // Get the row in question
        var rowArr = this.board[row - 1];

        // Before checking, assume that the player has not won
        // This will be set to true if we find that they have
        var hasWon = false;

        // This is the piece to check against
        var targetPiece = gamePieces[playerNumber - 1];

        // Start the pointer at the beggining of the row
        var pointer = 0;

        // Iterate up to the 5th column
        while (pointer < 5) {
            // If we find a piece, stop iterating
            if (rowArr[pointer] == targetPiece) {
                break;
            }

            // Otherwise, continue
            pointer++;
        }

        // If the player's piece was not found in the first 5 columns,
        // they cannot have won in that row
        // (because there are only 4 columns left)
        if (pointer == 5) return hasWon;

        // Otherwise, there is a possibility that they have
        // At this point, pointer != 5, so we must have found a piece in the current column
        // So far we have found 1 in a row
        var inARow = 1;

        // Move onto the next column
        pointer++;

        // Iterate to the end
        while (pointer < rowArr.length) {
            // If we find a piece, increase inARow
            if (rowArr[pointer] == targetPiece) {
                inARow++;
            } else {
                // Reset and continue for next column
                inARow = 0;
            }
            pointer++;

            // If at any point we find 5 in a row, stop iterating as the player has won
            if (inARow == 5) {
                hasWon = true;
                break;
            }
        }

        return hasWon;
    }

    /**
     * Checks if the player specified by the player number has 5 pieces in a row in the specified column
     * @param {*} column : The column number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player whose piece to check (1 or 2)
     */
    checkForWinnerVertically(column, playerNumber) {
        // Before checking, assume that the player has won
        // This will be set to false if we find that they have not
        var hasWon = true;

        // Start the pointer at the first row
        var pointer = 1;
        var rowArr = this.board[pointer - 1];

        // This is the piece to check against
        var targetPiece = gamePieces[playerNumber - 1];

        // For the player to win vertically, there are 2 cases:
        // If the target piece is in row 1, check rows 1 to 5
        // If not, check rows 2 to 6
        var endPoint = this.board.length;
        if (rowArr[column-1] == targetPiece) {
            endPoint--;
        } else {
            pointer++;

        }

        // Iterate to the end point
        while (pointer <= endPoint) {
            // Get the row array at that point
            rowArr = this.board[pointer - 1];

            // Check in the column for the target piece
            if (rowArr[column - 1] !== targetPiece) {
                // If at any point, we find that the player's piece is not there,
                // they have not won, so stop iterating and return that they have not
                hasWon = false;
                break;
            } 

            // Otherwise, check the next row
            pointer++;
        }

        // If we have found the player's piece in every row that we were looking in,
        // return that the player has won
        return hasWon;
    }

    /**
     * Checks if the player specified by the player number has 5 pieces in a row,
     * in the diagonal that runs from the bottom left of the board
     * to the top right of the board that passes through where the piece was added
     * @param {*} row : The row number (integer in the valid range, not zero-indexed)
     * @param {*} column : The column number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player whose piece to check (1 or 2)
     */
    checkForWinnerDiagonallyPositiveSlope(row, column, playerNumber) {
        // Before checking, assume that the player has not won
        // This will be set to true if we find that they have
        var hasWon = false;

        // Start at the piece's position,
        // and move 1 square down and left
        var currentRow = row + 1;
        var currentColumn = column - 1;

        // This is the piece to check against
        var targetPiece = gamePieces[playerNumber - 1];

        // We know that there is 1 in a row,
        // at the square where the piece was just added
        var inARow = 1;

        /** Moving down and left */
        // as we move down, the row pointer increases
        // as we move left, the column pointer decreases
        // the limits in the while loop condition are not zero indexed

        // Iterate to the bottom left of the board
        while (currentRow <= 6 && currentColumn >= 1) {
            // If we find the player's piece here
            if (this.board[currentRow - 1][currentColumn - 1] == targetPiece) {
                // Increment inARow
                inARow++;

                // If at any point we have found 5 in a row
                if (inARow == 5) {
                    // stop iterating and set that the player has won
                    hasWon = true;
                    break;
                }
            } else {
                // If we break the chain, stop looking in this direction
                break;
            }

            // Move down and left 1 square
            currentRow++;
            currentColumn--;
        }

        // Reset the pointers back to the piece that was just added,
        // and move 1 square up and right
        var currentRow = row - 1;
        var currentColumn = column + 1;

        /** Moving up and right */
        // as we move up, the row pointer decreases
        // as we move right, the column pointer increases
        // the limits in the while loop condition are not zero indexed

        // Iterate to the top right of the board
        while (currentRow >= 1 && currentColumn <= 9) {
            // If we find the player's piece here
            if (this.board[currentRow - 1][currentColumn - 1] == targetPiece) {
                // Increment inARow
                inARow++;

                // If at any point we have found 5 in a row
                if (inARow == 5) {
                    // stop iterating and set that the player has won
                    hasWon = true;
                    break;
                }
            } else {
                // If we break the chain, stop looking in this direction
                break;
            }

            // Move up and right 1 square
            currentRow--;
            currentColumn++;
        }

        // Return whether or not the player has won
        return hasWon;
    }

    /**
     * Checks if the player specified by the player number has 5 pieces in a row,
     * in the diagonal that runs from the top left of the board
     * to the bottom right of the board that passes through where the piece was added
     * @param {*} row : The row number (integer in the valid range, not zero-indexed)
     * @param {*} column : The column number (integer in the valid range, not zero-indexed)
     * @param {*} playerNumber : The player whose piece to check (1 or 2)
     */
    checkForWinnerDiagonallyNegativeSlope(row, column, playerNumber) {
        // Before checking, assume that the player has not won
        // This will be set to true if we find that they have
        var hasWon = false;

        // Start at the piece's position
        // and move 1 square up and left
        var currentRow = row - 1;
        var currentColumn = column - 1;

        // This is the piece to check against
        var targetPiece = gamePieces[playerNumber - 1];

        // We know that there is 1 in a row,
        // at the square where the piece was just added
        var inARow = 1;

        /** Moving up and left */
        // as we move up, the row pointer decreases
        // as we move left, the column pointer decreases
        // the limits in the while loop condition are not zero indexed

        // Iterate to the top left of the board
        while (currentRow >= 1 && currentColumn >= 1) {
            // If we find the player's piece here
            if (this.board[currentRow - 1][currentColumn - 1] == targetPiece) {
                // Increment inARow
                inARow++;

                // If at any point we have found 5 in a row
                if (inARow == 5) {
                    // stop iterating and set that the player has won
                    hasWon = true;
                    break;
                }
            } else {
                // If we break the chain, stop looking in this direction
                break;
            }

            // Move up and left 1 square
            currentRow--;
            currentColumn--;
        }

        // Reset the pointers back to the piece that was just added,
        // and move 1 square down and right
        var currentRow = row + 1;
        var currentColumn = column + 1;

        /** Moving down and right */
        // as we move down, the row pointer increases
        // as we move right, the column pointer increases
        // the limits in the while loop condition are not zero indexed

        // Iterate to the bottom right of the board
        while (currentRow <= 6 && currentColumn <= 9) {
            // If we find the player's piece here
            if (this.board[currentRow - 1][currentColumn - 1] == targetPiece) {
                // Increment inARow
                inARow++;

                // If at any point we have found 5 in a row
                if (inARow == 5) {
                    // stop iterating and set that the player has won
                    hasWon = true;
                    break;
                }
            } else {
                // If we break the chain, stop looking in this direction
                break;
            }

            // Move down and right 1 square
            currentRow++;
            currentColumn++;
        }

        // Return whether or not the player has won
        return hasWon;
    }
}

module.exports = Board;
