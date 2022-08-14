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

// Method 3
const is_unique_3 = (str) => {
    return new Set(str).size === str.length;
}

console.log("IS_UNIQUE_3 => ", is_unique_3("abAsdh"));
console.log("IS_UNIQUE_3 => ", is_unique_3("asbda"));