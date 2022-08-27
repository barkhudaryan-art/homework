const fs = require( 'fs' );
const path = require( 'path' );

const RANGE_SIZE = 98304;
const RANGE_NUM_COUNT = 43960;

const unique_nums_file_path = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );


const createRandomizedRange = (min, max, isCut = false) => {
    const set = [];
    for ( let i = min; i < max; isCut ? i += 2 : ++i ) {
        set.push( i );
    }
    let temp;
    let curr;
    let top = set.length;
    while ( top-- ) {
        curr = Math.floor(Math.random() * top + 1 );
        temp = set[curr];
        set[curr] = set[top];
        set[top] = temp;
    }
    return set;
};

const writeStream = fs.createWriteStream( unique_nums_file_path, { flags: 'a' } );

( async () => {
    // Creates an array of randomly ordered numbers,
    // each number is the minimum * 43,960 of a range
    const ranges = createRandomizedRange(0, RANGE_SIZE, true);
    // 49,152 iterations
    for ( let i = 0; i < ranges.length; ++i ) {
        // Creates an array of randomly ordered unique numbers in a specified range
        const range = createRandomizedRange(ranges[i] * RANGE_NUM_COUNT, ranges[i] * RANGE_NUM_COUNT + RANGE_NUM_COUNT );
        // 43,960 iterations
        // 2,160,721,920 in total
        for ( let j = 0; j < range.length; ++j ) {
            const ableToWrite = writeStream.write( `${range[j]} ` );
            if ( !ableToWrite ) {
                await new Promise( resolve => {
                    writeStream.once( 'drain', resolve );
                } );
            }
        }
    }
} )();

