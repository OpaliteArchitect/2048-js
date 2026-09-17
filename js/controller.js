function rowColToIndex(row, col) {
    return row * 4 + col;
}

function indexToCol(index) {
    return index % 4;
}

function indexToRow(index) {
    return index / 4;
}
