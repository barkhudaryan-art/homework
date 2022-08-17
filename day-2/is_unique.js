// Method 1
const is_unique_1 = (str) => {
    const obj = {};

    for (const ch of str) {
        if (obj[ch]) {
            return false
        }
        obj[ch] = true;
    }
    return true
}

console.log("IS_UNIQUE_1 => ", is_unique_1("abAcdefgh"));
console.log("IS_UNIQUE_1 => ", is_unique_1("aa"));

// Method 2 not ready yet
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

const is_unique_2 = (str) => {
    let bits = 0;

    for (const ch of str) {
        let bitAtIndex = ch.charCodeAt(0) - 'a'.charCodeAt(0);
        // console.log(ch.charCodeAt(0))
        if (bits & (1 << bitAtIndex)) {
            return false
        }

        bits |= (1 << bitAtIndex);
    }

    return true;
}

console.log("IS_UNIQUE_2 => ", is_unique_2("abAsdh"));
console.log("IS_UNIQUE_2 => ", is_unique_2("asbda"));