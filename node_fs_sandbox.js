const fs = require('fs');
const path = require('path');

const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")

// const file = fs.readFileSync(unique_nums_file_path, 'utf8')

const randomNumInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const setBit = (n, arr) => arr[Math.floor(n / 32)] |= 1 << n % 32;

const bitVector = new Array(32).fill(() => new Array(4194304).fill(0));
const writeStream = fs.createWriteStream(unique_nums_file_path, { flags: 'a' });
const ranges = [
    [40e8, 4294967295],
    [20e8, 24e8 - 1],
    [8e8, 12e8 - 1],
    [24e8, 28e8 - 1],
    [4e8, 8e8 - 1],
    [32e8, 36e8 - 1],
    [16e8, 20e8 - 1],
    [0, 4e8 - 1],
    [12e8, 16e8 - 1],
    [36e8, 40e8-1],
    [28e8, 32e8 - 1],
]
const writeToFile = async (range) => {
    let x = 0;
    let j = 0;
    for (let i = 0; i < bitVector.length; ++i) {
       while (x < 2e8) {
            for (let k = 0; k < 32; ++k) {
                const num = Math.abs(randomNumInRange(range[0], range[1]));
                if (!(bitVector[i][j] & (1 << k))) {
                    setBit(num % 134217728, bitVector[Math.floor(num / 134217728)])
                    const ableToWrite = writeStream.write(`${num} `);
                    if (!ableToWrite) {
                        await new Promise(resolve => {
                            writeStream.once('drain', resolve);
                        });
                    }
                    ++x;
                }
            }
            ++j;
        }
        j = 0;
    }
};

writeToFile(ranges[1])
writeToFile(ranges[0])

