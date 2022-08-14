const merge2Arrays = (arr1, arr2) => {
    const result = [...Array( arr1.length + arr2.length )];
    let i = 0,
        j = 0,
        x = 0;

    while ( result.length > x ) {
        if ( arr1[j] < arr2[i] ) {
            result[x] = arr1[j];
            j++;
        } else {
            result[x] = arr2[i];
            i++;
            if ( !arr2[i] && !result[x] ) {
                result[x] = arr1[j];
                j++;
            }
        }
        x++;
    }

    return result;
};

const mergeArrays = (...arrays) => {
    return arrays.reduce( (prevArr, currArr) => {
        return merge2Arrays( prevArr, currArr );
    }, [] );
};

const arr_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 123, 124, 62, 543, 6000];
const arr_2 = [6, 22, 31, 42, 54, 642, 5143];
const arr_3 = [10, 12, 43, 455, 955, 1062, 2543];
const arr_4 = [1000, 21241, 3124124, 4124124, 5214124, 6124242, 22542143];
const arr_5 = [10, 241, 314, 424, 524, 4242, 42143];

console.log( mergeArrays( arr_1, arr_2, arr_3, arr_4, arr_5 ) );