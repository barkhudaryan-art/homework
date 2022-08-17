const M = 10;

const matrix = Array(M).fill([]).map(() => Array(M).fill(0));

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
        matrix[i][j] = i * 10 + j;
    }
}

const N = M * M;
for (let i = 0; i < N; i++) {
    const row = ~~(i / M);
    const col = i % M;
    console.log(matrix[row][col])
}