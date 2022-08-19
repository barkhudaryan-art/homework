const N = 1000000;
const bitSize = 32;

const unsorted_unique_nums = [
    ...new Set(Array(N)
        .fill(0)
        .map(() => Math.round(Math.random() * (N)))),
];

// for (let i = 0; i < N; i++) {
//     unsorted_unique_nums[i] = i;
// }
//
// const shuffleArr = (arr) => {
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
//
// shuffleArr(unsorted_unique_nums);

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

const wonderSort = (arr) => {
    const result = [];
    let x = 0;
    let numIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < bitSize; j++) {
            if (arr[i] & (1 << j)) {
                result[x] = numIndex * bitSize + j;
                x++;
            }
        }
        numIndex++;
    }
    return result;
};

const chunkedWonderSort = (arr) => {
    const bitSet = bitVector(arr);
    const chunkSize = Math.ceil(N / bitSize * 0.1);
    const result = [];

    for (let i = 0; i < bitSet.length; i++) {
        const chunk = [...bitSet.slice(i * chunkSize, i * chunkSize + chunkSize)];
        if (!chunk.length) {
            break;
        }
        result.push(wonderSort(chunk, i))
    }
    return result.reduce((prev, curr) => [...prev, ...curr], [])
}

// chunkedWonderSort(unsorted_unique_nums)
console.log(chunkedWonderSort(unsorted_unique_nums))

