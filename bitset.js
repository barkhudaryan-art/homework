const N = 1000; // 10,000,000
const bitSize = 32;

const unsorted_unique_nums = [
    ...new Set(Array(N)
        .fill(0)
        .map(() => Math.round(Math.random() * (N)))),
];

// const unsorted_unique_nums = [];
//
// for (let i = 0; i < N; i++) {
//     unsorted_unique_nums[i] = i;
// }
//
// const shuffle = (arr) => {
//     let temp;
//     let curr;
//     let top = arr.length;
//     while (top--) {
//         curr = ~~(Math.random() * top + 1);
//         temp = arr[curr];
//         arr[curr] = arr[top];
//         arr[top] = temp;
//     }
//     return arr;
// }

// shuffle(unsorted_unique_nums);

// const arrayOfSpecifiedLength = (n) => Array(n).fill(0);

const setBit = (n, arr) => {
    const index = ~~(n / bitSize);
    const pos = n % bitSize;

    return arr[index] |= 1 << pos;
}

const bitVector = (arr) => {
    const bitSet = new Uint32Array(Math.ceil(N / bitSize));
    for (let i = 0; i < arr.length; i++) {
        setBit(arr[i], bitSet)
    }
    return bitSet
}

const wonderSort = (arr, chunkIndex) => {
    const result = [];
    let x = 0;
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
    console.log(i, chunkIndex)
        for (let j = 0; j < bitSize; j++) {
            if (arr[i] & (1 << j)) {
                result[x] = i * bitSize * chunkIndex + j;
                x++;
            }
        }
    }
    return result;
};

const chunkedWonderSort = (arr) => {
    const bitSet = bitVector(arr);
    const chunkSize = Math.ceil(N / bitSize * 0.1);
    const result = [];

    for (let i = 0; i < bitSet.length; i++) {
        const chunk = [...bitSet.slice(i * chunkSize, i * chunkSize + chunkSize)];
        // console.log(chunk)
        if (!chunk.length) {
            break;
        }
        result.push(wonderSort(chunk, i))
    }
    return result.reduce((prev, curr) => [...prev, ...curr], [])
}
// chunkedWonderSort(unsorted_unique_nums)
console.log(chunkedWonderSort(unsorted_unique_nums))

