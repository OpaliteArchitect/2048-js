const board = [];
for (let r = 0; r < 4; r++) {
    board[r] = [];
    for (let c = 0; c < 4; c++) {
        board[r][c] = 0;
    }
}

const cells = document.querySelectorAll(".cell");

function rowColToIndex(row, col) {
    return row * 4 + col;
}

function indexToCol(index) {
    return index % 4;
}

function indexToRow(index) {
    return index / 4;
}
