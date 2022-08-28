const fs = require('fs');
const path = require('path');

const BIT_SIZE = 32;

const setBit = (n, arr) => {
    return arr[Math.floor(n / BIT_SIZE)] |= 1 << (n % BIT_SIZE)
};

const createVector = (arr) => {
    const buffer = new ArrayBuffer( 536870912 )
    const vector = new Uint32Array( buffer );
    for ( let i = 0; i < arr.length; ++i ) {
        setBit( +arr[i], vector );
    }
    return vector;
}

const wonderSort = (arr) => {
    if (arr === undefined) return wonderSort.res;
    const vector = createVector( arr );
    const buffer = new ArrayBuffer( 17179869184 );
    wonderSort.res = wonderSort.res || new Uint32Array( buffer );
    for ( let i = 0; i < vector.length; ++i ) {
        for ( let j = 0; j < BIT_SIZE; ++j ) {
            if ( vector[i] & (1 << j) ) {
                wonderSort.res[i * BIT_SIZE + j] = i * BIT_SIZE + j;
            }
        }
    }
    return wonderSort.res;
}

// const unique_nums_file_path = path.resolve( __dirname, '../sandbox/remove.txt' );
// const unique_nums_file_path = path.resolve(__dirname, "../sandbox/nums.txt")
const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")
const testText = path.resolve(__dirname, "../sandbox/test.txt")
// const testText = path.resolve( __dirname, '../sandbox/Unique_Unsorted_Numbers.txt' );

const rs = fs.createReadStream(unique_nums_file_path);
const ws = fs.createWriteStream(testText);

// const chunks = [];
let buffer = '';
rs.on('readable', () => {
    let chunk;
    while (null !== (chunk = rs.read())) {
        const str = chunk.toString();
        if (str[str.length - 1] !== ' ') {
            buffer += str;
        } else {
            buffer += str;
            buffer = buffer.replace(/ $/, '');
            console.log('sss')
            wonderSort(buffer.split(' '))
            // console.log('sss')
            // console.log(wonderSort(buffer.split(' ')))

            buffer = '';
        }
    }
});
rs.on('end', () => {
    ( async () => {
        const ableToWrite = ws.write(`${buffer} `);
        if (!ableToWrite) {
            await new Promise(resolve => {
                ws.once('drain', resolve);
            });
        }
    })()
    // console.log(wonderSort())
    console.log('finished');
});
// rs.pipe(ws);
