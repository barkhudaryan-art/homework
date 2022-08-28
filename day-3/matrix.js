const ROW_COUNT = 10;
const COL_COUNT = 8;

const matrix = Array( ROW_COUNT ).fill( [] ).map( () => Array( COL_COUNT ).fill( 0 ) );

const N = ROW_COUNT * COL_COUNT;
for ( let i = 0; i < N; ++i ) {
    const row = ~~( i / COL_COUNT );
    const col = i % COL_COUNT;
    matrix[row][col] = i;
    console.log( matrix[row][col] );
}