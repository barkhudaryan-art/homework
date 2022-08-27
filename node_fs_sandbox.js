const fs = require( 'fs' );
const path = require( 'path' );

const unique_nums_file_path = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );


const generateObjFromRange = (min, max) => {
    const set = {};
    for ( let i = min; i < max; ++i ) {
        set[i] = i ;
    }
    return set;
};

const getIndexFromObjKeys = (rangeIndex, range) => {
    let index = 0
    for (const rangeKey in range) {
        if (index !== rangeIndex) {
            ++index;
            continue;
        }
        return rangeKey;
    }
}

const RANGE_SIZE = 16777216;
const RANGE_NUM_COUNT = 256
const range = generateObjFromRange(0, RANGE_SIZE);

const writeStream = fs.createWriteStream( unique_nums_file_path, { flags: 'a' } );

const writeToFile = async (range) => {
    for ( let i = 0; i < RANGE_SIZE; ++i ) {
    console.time('1')
        const rangeIndex = Math.floor( Math.random() * Object.keys(range).length );
        const index = getIndexFromObjKeys(rangeIndex, range);

        const innerRange = generateObjFromRange( rangeIndex * RANGE_NUM_COUNT, rangeIndex * RANGE_NUM_COUNT + RANGE_NUM_COUNT );
        for ( let j = 0; j < Math.floor(RANGE_NUM_COUNT / 2); ++j ) {
            const innerRangeIndex = Math.floor( Math.random() * Object.keys(innerRange).length );
            const index = getIndexFromObjKeys(innerRangeIndex, innerRange);
            // const ableToWrite = writeStream.write( `${index} ` );
            // if ( !ableToWrite ) {
            //     await new Promise( resolve => {
            //         writeStream.once( 'drain', resolve );
            //     } );
            // }
            // console.log(i,j)
            delete innerRange[index]
        }
        delete range[index]
    console.timeEnd('1')
    }
};

writeToFile( range );

