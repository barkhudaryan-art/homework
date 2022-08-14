const N = 10 ** 9 * 2; // 2 000 000 000

const unsorted_unique_nums = [
    ...new Set( Array( N )
        .fill( 0 )
        .map( () => Math.round( Math.random() * ( N ) ) ) ),
];

// const arrayOfSpecifiedLength = (n) => Array( n ).fill( 0 );

// const bitVector = () => {
//     const bitSet = arrayOfSpecifiedLength( Math.ceil(N / 32) );
// }

const wonderSort = (arr) => {
    // const result = arrayOfSpecifiedLength( arr.length );

    // for ( let i = 0; i < arr.length; i++ ) {
    //     bitSet[arr[i]] = 1;
    // }
    // let x = 0;
    // for ( let i = 0; i < bitSet.length; i++ ) {
    //     if ( bitSet[i] ) {
    //         result[x] = i;
    //         x++;
    //     }
    // }
    return arr;
};

console.log( wonderSort( unsorted_unique_nums ) );