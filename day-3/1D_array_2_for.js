const N = 1000;

const unsorted_unique_nums = [
    ...new Set( Array( N )
        .fill( 0 )
        .map( () => Math.round( Math.random() * ( N ) ) ) ),
];

const sequentialSearch = (arr, n) => {
    for ( let i = 0; i < arr.length; ++i ) {
        for ( let j = arr.length - 1; --j; ) {
            if ( arr[i] === n ||  arr[j] === n ) {
                return true;
            }
        }
    }
    return false;
};

console.log( sequentialSearch( unsorted_unique_nums, 40 ) );
console.log( sequentialSearch( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5 ) );