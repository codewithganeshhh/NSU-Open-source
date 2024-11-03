let solution = Array(9);
const levels = { easy: 25, medium: 45, hard: 60,insane:75};
let solCount = 0;
let grid;

function createArray(){
    for (let i = 0; i < 9; i++)
        solution[i] = new Array(9).fill('0');
}

const fillArray = (i, j) => {
    for (; i < 9; i++) {
        for (; j < 9; j++) {
            if (solution[i][j] == '0') {
                for (let k = parseInt(Math.random() * 9) + 1, ct = 0; ct < 9; k = (k == 9) ? 1 : k + 1) {
                    ct++;
                    if (isValid(i, j, k.toString(), solution)) {
                        solution[i][j] = k.toString();
                        if (fillArray(i, j))
                            return true;
                        solution[i][j] = '0';
                    }
                }
                return false;
            }
        }
        j = 0;
    }
    return true;
}

const isValid = (i, j, k, board) => {
    let row = parseInt(i / 3) * 3;
    let col = parseInt(j / 3) * 3;
    for (let it = 0; it < 9; it++) {
        if (board[i][it] == k)
            return false;
        if (board[it][j] == k)
            return false;
        if (board[row + parseInt(it / 3)][col + parseInt(it % 3)] == k)
            return false;
    }
    return true;
}


function removeCells(k) {
    grid = JSON.parse(JSON.stringify(solution));
    let ct = 1;
    let r = 40;
    while (k && r) {
        let row = parseInt(Math.random() * 9);
        let col = parseInt(Math.random() * 9);
        let removedNum = grid[row][col];
        grid[row][col] = '0';
        if (solve(0, 0, ct) == 1) {
            k--;
            ct++;
        } else {
            r--;
            grid[row][col] = removedNum;
        }
    }
}

const solve = (i, j, Count) => {
    if (Count == 0) return 1;
    let solCount = 0;
    for (; i < 9; i++) {
        for (; j < 9; j++) {
            if (grid[i][j] == '0') {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(i, j, k.toString(), grid)) {
                        grid[i][j] = k.toString();
                        solCount += solve(i, j, Count - 1);
                        grid[i][j] = '0';
                    }
                    if (solCount > 1) 
                        return solCount;
                }
                return solCount;
            }
        }
        j = 0;
    }
    return solCount;
}

export const generateSudoku = (level) => {
    solution = Array(9);
    grid = undefined;
    createArray();
    fillArray(0, 0);
    removeCells(levels[level]);
    return { solution, grid };
};
