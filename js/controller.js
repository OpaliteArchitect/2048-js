import * as dom from "./dom.js";
import {
    board,
    resetBoard,
    rotateBoardClockwise,
    shiftBoardLeft,
    spawnNewTile,
    status,
} from "./game-model.js";

let highScore = Number(localStorage.getItem("highScore") ?? 0);
const WINNING_MESSAGE = "You won!";
const LOSING_MESSAGE = "Game over.";

attachEventListeners();
//mock();
resetGame();

function resetGame() {
    dom.statusMessage.textContent = "";
    compareHighScore();
    status.score = 0;
    resetBoard();
    spawnNewTile();
    spawnNewTile();
    render();
}

function mock() {
    let value = 2;
    for (let i = 0; i < 16; i++) {
        const row = indexToRow(i);
        const col = indexToCol(i);

        board[row][col] = value;
        value *= 2;
    }
    render();
}

function attachEventListeners() {
    for (const arrow of dom.arrows) {
        arrow.addEventListener("click", handleArrowClick);
    }

    dom.restart.addEventListener("click", resetGame);
}

function handleArrowClick(event) {
    if (status.isWon) {
        compareHighScore();
        dom.statusMessage.textContent = WINNING_MESSAGE;
        render();
        return;
    }

    if (status.isGameOver) {
        compareHighScore();
        dom.statusMessage.textContent = LOSING_MESSAGE;
        render();
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

    if (status.isWon) {
        compareHighScore();
        dom.statusMessage.textContent = WINNING_MESSAGE;
        render();
        return;
    }

    if (status.isGameOver) {
        compareHighScore();
        dom.statusMessage.textContent = LOSING_MESSAGE;
        render();
        return;
    }

    if (!status.isFull) {
        spawnNewTile();
    }

    render();
}

function render() {
    for (let i = 0; i < dom.cells.length; i++) {
        const value = board[indexToRow(i)][indexToCol(i)];
        dom.cells[i].textContent = value === 0 ? "" : value;

        const power = Math.log2(value);
        const hue = 60 - (power - 1) * 5; // 60 to 10
        // const saturation = 50 + (power - 1) * 5; // 50 to 100
        const lightness = 95 - (power - 1) * 5; // 95 to 45
        dom.cells[i].style.setProperty(
            "background-color",
            value ? `hsl(${hue} 100% ${lightness}%)` : "white",
        );
    }

    dom.score.textContent = status.score;
    if (dom.statusMessage.textContent === "") {
        dom.statusMessage.classList.add("hidden");
    } else {
        dom.statusMessage.classList.remove("hidden");
    }
}

function compareHighScore() {
    if (status.score > highScore) {
        highScore = status.score;
        localStorage.setItem("highScore", highScore);
    }
    dom.highScore.textContent = highScore;
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
