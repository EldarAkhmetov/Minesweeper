import { MINE } from "../utils/consts";

export const generateNewField = (width, height, minesNumber, currentRow, currentCol) => {
    const field = new Array(width * height).fill(0);
    const incrementCell = (row, col) => {
        if (col >= 0 && col < width && row >= 0 && row < height) {
            if (field[row * width + col] === MINE) return;
            field[row * width + col] += 1;
        }
    }
    for (let i = 0, j = 0; i < minesNumber; j++) {
        if (j > 1000) return generateNewField(width, height, minesNumber, currentRow, currentCol);
        const col = Math.floor(Math.random() * width);
        const row = Math.floor(Math.random() * height);

        if (field[row * width + col] === MINE
            || field[currentRow * width + currentCol] === MINE) continue;

        field[row * width + col] = MINE;
        i++;
        incrementCell(row + 1, col);
        incrementCell(row - 1, col);
        incrementCell(row, col - 1);
        incrementCell(row, col + 1);
        incrementCell(row + 1, col - 1);
        incrementCell(row + 1, col + 1);
        incrementCell(row - 1, col - 1);
        incrementCell(row - 1, col + 1);
    }
    return field;
}