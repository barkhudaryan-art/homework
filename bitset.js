const N = 10 ** 3;
const unsorted_unique_nums = [
    ...new Set( Array( N )
        .fill( 0 )
        .map( () => Math.round( Math.random() * ( N ) ) ) ),
];

const bitSet = (n) => Array( n ).fill( 0 );

const wonderSort = (arr) => {
    const bitMap = bitSet( N );
    const result = Array( arr.length ).fill(0);
    for ( let i = 0; i < arr.length; i++ ) {
        bitMap[arr[i]] = 1;
    }
    let x = 0;
    for ( let i = 0; i < bitMap.length; i++ ) {
        if ( bitMap[i] ) {
            result[x] = i;
            x++;
        }
    }
    return result;
};

console.log( wonderSort( unsorted_unique_nums ) );