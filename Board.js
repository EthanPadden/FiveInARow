const emptySqaure = '[ ]';

class Board {
    constructor() {
        var emptyRow = [];
        this.board = [];

        // Build up an empty row of 9 empty squares
        for(var i = 0; i < 9; i++){
            emptyRow.push(emptySqaure);
        }

        // Build up an empty board of 6 empty rows
        for(var i = 0; i < 6; i++) {
            this.board.push(emptyRow);
        }
    }

    toString() {
        var boardStr = '';

        // The board is an array of rows
        for(var i = 0; i < this.board.length; i++) {
            var rowStr = '';
            var rowArr = this.board[i];
            for(var j = 0; j < rowArr.length; j++) {
                rowStr += rowArr[i];
            }
            boardStr += rowStr + '\n';
        }

        return boardStr;
    }
}

module.exports = Board;
