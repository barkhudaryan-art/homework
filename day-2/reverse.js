const reverse_string = (str) => {
    const res = [];
    for (const ch of str) {
        res.unshift(ch);
    }
    return res.join('');
}

console.log(reverse_string('aaaabbbb'))
console.log(reverse_string('ytrewq'))
console.log(reverse_string('ytr𝌆𝌆ewq😀'))