const board = [];
for (let r = 0; r < 4; r++) {
    board[r] = [];
    for (let c = 0; c < 4; c++) {
        board[r][c] = 0;
    }
}

export function rotateBoardClockwise(rotations) {
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

export function shiftBoardLeft() {
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

export function spawnNewTile() {
    let r, c;
    do {
        r = getRandomInt(0, 3);
        c = getRandomInt(0, 3);
    } while (board[r][c] !== 0);

    board[r][c] = getRandomInt(1, 100) <= 90 ? 2 : 4;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
