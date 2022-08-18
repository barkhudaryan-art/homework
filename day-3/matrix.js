const ROW = 7;
const COL = 8;

const matrix = Array( ROW ).fill( [] ).map( () => Array( COL ).fill( 0 ) );

for ( let i = 0; i < ROW; i++ ) {
    for ( let j = 0; j < COL; j++ ) {
        matrix[i][j] = i * COL + j;
    }
}

const N = ROW * COL;
for ( let i = 0; i < N; i++ ) {
    const row = ~~( i / COL );
    const col = i % COL;
    console.log( matrix[row][col] );
}