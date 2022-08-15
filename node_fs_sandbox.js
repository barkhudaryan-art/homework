const fs = require('fs');
const path = require('path');

const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")

// const file = fs.readFileSync(unique_nums_file_path, 'utf8')

const randomNumInRange = (min, max) => {
    return Math.random() * (max-min) + min;
}

const fileWriteStream = fs.createWriteStream(path.resolve(unique_nums_file_path));
const foo = async () => {
    const obj = {};
    for (let i = 0; i < 50000000; i++) {
        const num = Math.abs(~~randomNumInRange(100000000, 200000000));
        if (obj[num]) continue;
        obj[num] = true;
        const ableToWrite = fileWriteStream.write(`${num}\n`);
        if (!ableToWrite) {
            await new Promise(resolve => {
                fileWriteStream.once('drain', resolve);
            });
        }
    }
}

foo();