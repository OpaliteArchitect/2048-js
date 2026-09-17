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

function rotateBoardClockwise(rotations) {
    for (let i = 0; i < rotations; i++) {
        for (let r = 0; r < 4; r++) {
            for (let c = r + 1; c < 4; c++) {
                [board[r][c], board[c][r]] = [board[c][r], board[r][c]];
            }
        }

        for (let r = 0; r < 4; r++) {
            [board[r][0], board[r][3]] = [board[r][3], board[r][0]];
            [board[r][1], board[r][2]] = [board[r][2], board[r][1]];
        }
    }
}

function shiftBoardLeft() {
    for (const row of board) {
        for (let c = 1; c < row.length; c++) {
            if (row[c - 1] === 0) {
                row[c - 1] = row[c];
                row[c] = 0;
            }
        }
    }

    for (const row of board) {
        for (let c = 0; c < row.length - 1; c++) {
            if (row[c] !== 0 && row[c] === row[c + 1]) {
                row[c] = row[c] * 2;
                row[c + 1] = 0;
            }
        }
    }

    for (const row of board) {
        for (let c = 1; c < row.length; c++) {
            if (row[c - 1] === 0) {
                row[c - 1] = row[c];
                row[c] = 0;
            }
        }
    }
}
