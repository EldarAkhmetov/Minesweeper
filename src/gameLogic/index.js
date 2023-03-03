import { Mask, MINE } from "../utils/consts";

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

export const clearMask = (id, field, mask, width, height) => {
    const clearing = [];
    const row = Math.floor(id / height);
    const col = id % height;
    const clear = (x, y) => {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            if (mask[y * width + x] === Mask.transparent || mask[y * width + x] === Mask.flag)
                return;
            clearing.push([x, y]);
        }
    }
    clear(col, row);
    while(clearing.length) {
        const [currentCol, currentRow] = clearing.pop();
        mask[currentRow * width + currentCol] = Mask.transparent;
        if (field[currentRow * width + currentCol] !== 0) continue;
        clear(currentCol, currentRow + 1);
        clear(currentCol, currentRow - 1);
        clear(currentCol + 1, currentRow);
        clear(currentCol - 1, currentRow);
        clear(currentCol + 1, currentRow + 1);
        clear(currentCol + 1, currentRow - 1);
        clear(currentCol - 1, currentRow + 1);
        clear(currentCol - 1, currentRow - 1);
    }    
}

export const checkVictory = (mask, minesNumber, width, height) => {
    const transparentCount = mask
      .reduce((acc, cell) => cell === Mask.transparent ? acc + 1 : acc, 0);
    return transparentCount === (width * height - minesNumber);
}
