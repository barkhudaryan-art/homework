const fs = require( 'fs' );
const path = require( 'path' );

const BIT_SIZE = 32;

const setBit = (n, arr) => {
    return arr[Math.floor( n / BIT_SIZE )] |= 1 << ( n % BIT_SIZE );
};

const setVector = (arr, vector) => {
    for ( let i = 0; i < arr.length; ++i ) {
        setBit( arr[i], vector );
    }
    return vector;
};

const createByteArray = (byteLength) => {
    return new Uint32Array( new ArrayBuffer( byteLength ) );
};

const wonderSort = (arr) => {
    if ( arr === undefined ) {
        const res = createByteArray( 8642887680 );
        let index = 0;
        for ( let i = 0; i < wonderSort.vector.length; ++i ) {
            for ( let j = 0; j < BIT_SIZE; ++j ) {
                if ( wonderSort.vector[i] & ( 1 << j ) ) {
                    res[index] = i * BIT_SIZE + j;
                    ++index;
                }
            }
        }
        return res;
    }
    wonderSort.vector = setVector( arr, wonderSort.vector || createByteArray( 536870912 ) );
};

// const unique_nums_file_path = path.resolve( __dirname, '../sandbox/remove.txt' );
const unique_nums_file_path = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );
const testText = path.resolve( __dirname, '../sandbox/test.txt' );
// const testText = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );

const rs = fs.createReadStream( unique_nums_file_path );
const ws = fs.createWriteStream( testText );

let buffer = '';
rs.on( 'readable', () => {
    let chunk;
    while ( null !== ( chunk = rs.read() ) ) {
        const str = chunk.toString();
        if ( str[str.length - 1] !== ' ' ) {
            buffer += str;
        } else {
            buffer += str;
            buffer = buffer.replace( / $/, '' );
            wonderSort( buffer.split( ' ' ) );
            buffer = '';
        }
    }
} );
rs.on( 'end', () => {
    ( async () => {
        const sortedArr = wonderSort();
        for ( let i = 0; i < sortedArr.length; i++ ) {
            const ableToWrite = ws.write( `${sortedArr[i]} ` );
            if ( !ableToWrite ) {
                await new Promise( resolve => {
                    ws.once( 'drain', resolve );
                } );
            }
        }
    } )();
    console.log( 'finished' );
} );
