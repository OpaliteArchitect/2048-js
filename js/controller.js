import { arrows, cells } from "./dom.js";
import {
    board,
    Has2048,
    isGameOver,
    rotateBoardClockwise,
    shiftBoardLeft,
    spawnNewTile,
} from "./game-model.js";

spawnNewTile();
spawnNewTile();
render();

for (const arrow of arrows) {
    arrow.addEventListener("click", handleArrowClick);
}

function handleArrowClick(event) {
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

    if (Has2048()) {
        return;
    }

    if (isGameOver()) {
        return;
    }

    spawnNewTile();
    render();
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
