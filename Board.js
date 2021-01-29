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
}

module.exports = Board;
