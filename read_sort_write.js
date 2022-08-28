const fs = require( 'fs' );
const path = require( 'path' );

const BIT_SIZE = 32;

const setBit = (n, arr) => {
    return arr[Math.floor(n / BIT_SIZE)] |= 1 << (n % BIT_SIZE)
};

const createVector = (arr) => {
    const vector =  new Uint32Array(134217728);
    for ( let i = 0; i < arr.length; ++i ) {
        setBit( +arr[i], vector );
    }
    return vector;
}

const wonderSort = (arr) => {
    const vector = createVector( arr );
    const res = [];
    let index = 0;
    for ( let i = 0; i < vector.length; ++i ) {
        for ( let j = 0; j < BIT_SIZE; ++j ) {
            if (vector[i] & (1 << j)) {
                res[index] = i * BIT_SIZE + j;
                ++index;
            }
        }
    }
    return res;
}

// const unique_nums_file_path = path.resolve( __dirname, '../sandbox/remove.txt' );
// const unique_nums_file_path = path.resolve(__dirname, "../sandbox/nums.txt")
const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")
const testText = path.resolve(__dirname, "../sandbox/test.txt")
// const testText = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );

const rs = fs.createReadStream( unique_nums_file_path );
const ws = fs.createWriteStream( testText );

// const chunks = [];
let buffer = '';
let count = 0;
rs.on( 'readable', () => {
    let chunk;
    while ( null !== ( chunk = rs.read() ) ) {
        if ( chunk.toString()[chunk.toString().length - 1] !== ' ' ) {
            buffer += chunk.toString();
        } else {
            ++count;
            if (buffer.split(' ').length > 100000) {
                wonderSort(buffer.split(' '))
                // console.log(buffer.split(' '))
                // console.log(buffer.split(' ').sort((a,b) => a - b))
            }
            // ( async () => {
            //     const ableToWrite = ws.write(`${} `);
            //     if (!ableToWrite) {
            //         await new Promise(resolve => {
            //             ws.once('drain', resolve);
            //         });
            //     }
            // })()
            buffer = '';
        }
    }
} );
rs.on( 'end', () => {
    console.log(count)
    console.log( 'finished' );
} );
rs.pipe( ws );
