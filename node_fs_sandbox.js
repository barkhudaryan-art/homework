const fs = require( 'fs' );
const path = require( 'path' );

const unique_nums_file_path = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );

const range = Array.from( Array( 42949673 ).keys() );

const generateArrFromRange = (min, max) => {
    const arr = [];
    for ( let i = min; i < max; i++ ) {
        arr.push( i );
    }
    return arr;
};

const writeStream = fs.createWriteStream( unique_nums_file_path, { flags: 'a' } );

const writeToFile = async (range) => {
    for ( let i = 0; i < 42949673; ++i ) {
        // console.time('1')
        // const rangeIndex = Math.floor( Math.random() * range.length );
        let temp = generateArrFromRange( range[i] * 100, range[i] === 42949672 ?
                                                                    4294967295 :
                                                                    range[i] * 100 + 100 );

        for ( let j = 0; j < 50; ++j ) {
            const index = Math.floor( Math.random() * temp.length );

            const ableToWrite = writeStream.write( `${temp[index]} ` );
            if ( !ableToWrite ) {
                await new Promise( resolve => {
                    writeStream.once( 'drain', resolve );
                } );
            }
            temp.splice( index, 1 );
        }
        // range.splice( rangeIndex, 1 );
        // console.timeEnd('1')
    }
};

writeToFile( range );

