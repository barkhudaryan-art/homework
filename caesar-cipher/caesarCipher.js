const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const INDEXES = {
    A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8,
    J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16,
    R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
    0: 26, 1: 27, 2: 28, 3: 29, 4: 30, 5: 31, 6: 32, 7: 33, 8: 34, 9: 35
}

const SYMBOL_COUNT = 36;

const encode = (str, shiftAmount, LI = { ...INDEXES }) => {
    str = str.toUpperCase();
    let res = "";
    const shift = shiftAmount % SYMBOL_COUNT;

    for (const index in LI) {
        if (LI[index] + shift > SYMBOL_COUNT - 1) {
            LI[index] = (LI[index] + shift) % SYMBOL_COUNT;
            continue;
        }
        LI[index] += shift;
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            res += str[i];
            continue;
        }
        res += LETTERS[LI[str[i]]];
    }
    return res;
}

const decode = (str, shiftAmount, LI = { ...INDEXES }) => {
    str = str.toUpperCase();
    let res = "";
    const shift = shiftAmount % SYMBOL_COUNT;

    for (const index in LI) {
        if (LI[index] - shift < 0) {
            LI[index] =  SYMBOL_COUNT - shift + LI[index];
            continue;
        }
        LI[index] -= shift;
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            res += str[i];
            continue;
        }
        res += LETTERS[LI[str[i]]];
    }
    return res;
}

console.log(encode("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", 3));
console.log(decode("WKH TXLFN EURZQ IR0 MXPSV RYHU WKH OD21 GRJ", 3));

console.log(encode("Deciphering is done in reverse with a right shift of 3", 4));
console.log(decode("HIGMTLIVMRK MW HSRI MR VIZIVWI 0MXL E VMKLX WLMJX SJ 7", 4));