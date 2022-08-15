const big_int = (str) => {
    if ( typeof str !== 'string' ) {
        return 'Wrong format';
    }
    if ( /\D/.test( str ) ) {
        return 'String contains non-digit chars';
    }

    const arr = str.replace( /(?<=\d)(?=(?:\d{3})+(?!\d))/g, '.' ).split( '.' );

    return arr.map( x => +( ( +x ).toString( 2 ) ) );
};

const subtract_big_numbers = (s1, s2) => {
    s1 = [...s1.replace( /^0*/g, '' )].reverse();
    s2 = [...s2.replace( /^0*/g, '' )].reverse();

    while (s2.length < s1.length) {
        s2.push( 0 );
    }

    let res = '';
    let carry = 0;

    for ( let i = 0; i < s1.length; i++ ) {
        let sub = s1[i] - s2[i] - carry;

        if ( sub < 0 ) {
            sub += 10;
            carry = 1;
        } else {
            carry = 0;
        }
        res += sub.toString();
    }

    return [...res]
        .reverse()
        .join( '' )
        .replace( /^0+(?=0$)/g, '' );
};

const add_big_numbers = (num1, num2) => {
    const arr1 = num1.replace( /^0*/g, '' ).split( '' );
    const arr2 = num2.replace( /^0*/g, '' ).split( '' );
    const lenDiff = arr1.length - arr2.length;
    let temp = lenDiff >= 0 ? [...Array( arr1.length )] : [...Array( arr2.length )];

    // Optimization needed
    for ( let i = 0; i < Math.abs( lenDiff ); i++ ) {
        if ( arr1.length > arr2.length ) {
            arr2.unshift( '0' );
        } else {
            arr1.unshift( '0' );
        }
    }

    for ( let i = temp.length; i-- > 0; ) {
        temp[i] = ( +arr1[i] + +arr2[i] );
    }

    for ( let i = temp.length; i-- > 0; ) {
        const digits = temp[i].toString().split( '' );
        const fst = temp[0];
        if ( digits.length > 1 ) {
            if ( temp[i] > 9 && i === 0 ) {
                temp[i] = fst;
                break;
            }
            temp[i] = +digits[1];
            temp[i - 1] += 1;
        }
    }

    return temp.join( '' ).replace( /^0/g, '10' );
};

console.log( add_big_numbers( '8489498498416516584984186951891894865148941', '57439498498416516584984186951891894865148941' ) );
console.log( subtract_big_numbers( '988489498498416516584984186951891894865148941', '8416516584984186951891894865148941' ) );

