const fs = require('fs');
const path = require('path');

const unique_nums_file_path = path.resolve(__dirname, "../sandbox/Unique_Unsorted_Numbers.txt")

// const file = fs.readFileSync(unique_nums_file_path, 'utf8')

const randomNumInRange = (min, max) => {
    return Math.random() * (max-min) + min;
}

const writeStream = fs.createWriteStream(unique_nums_file_path);
(async () => {
    const obj = {};
    for (let i = 0; i < 50000000; i++) {
        const num = Math.abs(~~randomNumInRange(2e8, 250000000));
        if (obj[num]) continue;
        obj[num] = true;
        const ableToWrite = writeStream.write(`${num}\n`);
        if (!ableToWrite) {
            await new Promise(resolve => {
                writeStream.once('drain', resolve);
            });
        }
    }
})()
