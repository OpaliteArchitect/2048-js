import { arrows, cells, restart, statusMessage } from "./dom.js";
import {
    board,
    resetBoard,
    rotateBoardClockwise,
    shiftBoardLeft,
    spawnNewTile,
    status,
} from "./game-model.js";

resetGame();

const WINNING_MESSAGE = "You won!";
const LOSING_MESSAGE = "Game over.";

function resetGame() {
    statusMessage.textContent = "";
    resetBoard();
    spawnNewTile();
    spawnNewTile();
    render();
}

for (const arrow of arrows) {
    arrow.addEventListener("click", handleArrowClick);
}

restart.addEventListener("click", resetGame);

function handleArrowClick(event) {
    if (status.isWon) {
        statusMessage.textContent = WINNING_MESSAGE;
        return;
    }

    if (status.isGameOver) {
        statusMessage.textContent = LOSING_MESSAGE;
        return;
    }

    let arrow = event.target;
    switch (arrow.dataset.direction) {
        case "up":
            rotateBoardClockwise(3);
            shiftBoardLeft();
            rotateBoardClockwise(1);
            break;
        case "left":
            shiftBoardLeft();
            break;
        case "right":
            rotateBoardClockwise(2);
            shiftBoardLeft();
            rotateBoardClockwise(2);
            break;
        case "down":
            rotateBoardClockwise(1);
            shiftBoardLeft();
            rotateBoardClockwise(3);
            break;
    }

    if (!status.isFull) {
        spawnNewTile();
        render();
    }
}

function render() {
    for (let i = 0; i < cells.length; i++) {
        const value = board[indexToRow(i)][indexToCol(i)];
        cells[i].textContent = value === 0 ? "" : value;
    }
}

function rowColToIndex(row, col) {
    return row * 4 + col;
}

function indexToCol(index) {
    return index % 4;
}

function indexToRow(index) {
    return Math.floor(index / 4);
}
