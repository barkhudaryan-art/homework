const big_int = (str) => {
    if (typeof str !== "string") {
        return "Wrong format";
    }
    if (/\D/.test(str)) {
        return "String contains non-digit chars";
    }

    const arr = str.replace(/(?<=\d)(?=(?:\d{3})+(?!\d))/g, '.').split('.');

    return arr.map(x => +((+x).toString(2)))
}

console.log(big_int("8489498498416516584984186951891894865148941"))

// const add_big_numbers = (n1, n2) => {
//
// }
//
// const subtract_big_numbers = (n1, n2) => {
//
// }

