const fs = require('fs');
const path = require('path');


const BIT_SIZE = 32;

const setBit = (n, arr) => arr[Math.floor(n / BIT_SIZE)] |= 1 << n % BIT_SIZE;

const createBitVector = (arr) => {
    const bitVector = new Array(BIT_SIZE).fill(0).map(() => new Array(4194304).fill(0));
    for (let i = 0; i < arr.length; ++i) {
        setBit(arr[i] % 134217728, bitVector[Math.floor(arr[i] / 134217728)])
    }
    return bitVector
}

const wonderSort = (arr) => {
    const bitVector = createBitVector(arr);
    const result = [];
    let bitIndex = 0;
    for (let i = 0; i < bitVector.length; ++i) {
        for (let j = 0; j < bitVector[i].length; ++j) {
            for (let k = 0; k < BIT_SIZE; ++k) {
                if (bitVector[i][j] & (1 << k)) {
                    result[bitIndex] = j * BIT_SIZE + i * 134217728 + k;
                    bitIndex++;
                }
            }
        }
    }
    return result;
};

const merge2Arrays = (arr1, arr2) => {
    const result = [...Array( arr1.length + arr2.length )];
    let i = 0,
        j = 0,
        x = 0;

    while ( result.length > x ) {
        if ( arr1[j] < arr2[i] ) {
            result[x] = arr1[j];
            j++;
        } else {
            result[x] = arr2[i];
            i++;
            if ( !arr2[i] && !result[x] ) {
                result[x] = arr1[j];
                j++;
            }
        }
        x++;
    }

    return result;
};

const mergeArrays = (...arrays) => {
    // console.log(arrays)
    return arrays.reduce( (prevArr, currArr) => {
        return merge2Arrays( prevArr, currArr );
    }, [] );
};


const unique_nums_file_path = path.resolve(__dirname, "../sandbox/remove.txt")
// const unique_nums_file_path = path.resolve(__dirname, "../sandbox/nums.txt")
// const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")
// const testText = path.resolve(__dirname, "../sandbox/test.txt")
const testText = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")

const rs = fs.createReadStream(unique_nums_file_path);
const ws = fs.createWriteStream(testText);

const chunks = [];
let buffer = '';

rs.on('readable', () => {
    let chunk;
    while (null !== (chunk = rs.read())) {
        if (buffer.length < 100000000 || chunk.toString()[chunk.toString().length - 1] !== ' ') {
            buffer += chunk.toString();
        } else {
            chunks.push(buffer);
            buffer = '';
        }
    }
})
rs.on('end', () => {
    for (let i = 0; i < chunks.length; ++i) {
        chunks[i] = wonderSort(chunks[i].split(' '))
    }
    console.log(chunks)
    // const finalRes = mergeArrays(chunks[0], chunks[1], chunks[2], chunks[3]);
    // console.log(finalRes)
    console.log('finished')
})
rs.pipe(ws)
