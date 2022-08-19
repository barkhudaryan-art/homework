const ROW_COUNT = 10;
const COL_COUNT = 8;

const matrix = Array( ROW_COUNT ).fill( [] ).map( () => Array( COL_COUNT ).fill( 0 ) );

for ( let i = 0; i < ROW_COUNT; i++ ) {
    for ( let j = 0; j < COL_COUNT; j++ ) {
        matrix[i][j] = i * COL_COUNT + j;
    }
}

const N = ROW_COUNT * COL_COUNT;
for ( let i = 0; i < N; i++ ) {
    const row = ~~( i / COL_COUNT );
    const col = i % COL_COUNT;
    console.log( matrix[row][col] );
}