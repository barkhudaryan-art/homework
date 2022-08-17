class CustomBigInt {
    constructor(num) {
        this.num = this.to_big_int( num ) || '';
    }

    to_big_int(str) {
        if ( typeof str !== 'string' ) {
            return 'Wrong format';
        }

        if ( /\D/.test( str ) ) {
            return 'String contains non-digit chars';
        }

        const arr = this.splitNumByMillions( str );
        return this.num = [...arr];
    };

    print() {
        console.log( this.num.join( '' ) );
    };

    isSubtrahendBigger(num1, num2) {
        num1 = num1.replace(/^-/, '');
        num2 = num2.replace(/^-/, '');

        if ( num1.length > num2.length ) return false;
        if ( num1.length < num2.length ) return true;

        for ( let i = 0; i < num2.length; i++ ) {
            if ( num1[i] < num2[i] ) return true;
            if ( num1[i] > num2[i] ) return false;
        }

        return false;
    }

    getNumbersSign(num1, num2) {
        return [/^-/.test( num1 ), /^-/.test( num2 )];
    }

    splitNumByMillions(str) {
        return str.replace( /(?<=\d)(?=(?:\d{7})+(?!\d))/g, '.' ).split( '.' );
    }

    splitNumbers(str) {
        return this.splitNumByMillions( str.replace( /^-?0+/g, '' ) ).reverse();
    }

    convertToTenMillion(n) {
        const TEN_MIL = 1e7;
        return ( n / TEN_MIL + 1 ) * TEN_MIL;
    }

    handleZeros(arr) {
        return arr.map( (n, i) => {
            const len = 7 - n.toString().length;
            return i === 0 || !len ? n : `${'0'.repeat( len )}${n}`;
        } );
    }

    subtract_big_numbers = (num1, num2) => {
        const [num1Sign, num2Sign] = this.getNumbersSign( num1, num2 );

        // Subtrahend is negative, add the numbers
        if ( !num1Sign && num2Sign ) {
            return this.add_big_numbers( num1, num2.substring( 1 ) );
        }

        // Minuend is negative, add the numbers with - sign
        if ( num1Sign && !num2Sign ) {
            return `-${this.add_big_numbers( num1.substring( 1 ), num2 )}`;
        }

        // Both numbers are negative
        if ( num1Sign && num2Sign ) {
            const isSubtrahendBigger = this.isSubtrahendBigger( num1, num2 );
            // Subtrahend is bigger
            if ( isSubtrahendBigger ) {
                return this.subtract_big_numbers( num2.substring( 1 ), num1.substring( 1 ) );
            }
            return `-${this.subtract_big_numbers( num1.substring( 1 ), num2.substring( 1 ) )}`;
        }

        const isSubtrahendBigger = this.isSubtrahendBigger( num1, num2 );
        if ( isSubtrahendBigger ) {
            return `-${this.subtract_big_numbers( num2, num1 )}`;
        }
        num1 = this.splitNumbers( num1 ).map( x => +x );
        num2 = this.splitNumbers( num2 ).map( x => +x );
        const container = [];
        let carry = 0;
        for ( let i = 0, len = num1.length; i < len; i++ ) {
            let diff = 0;
            if ( num1[i] < num2[i] ) {
                diff = this.convertToTenMillion( num1[i] ) - num2[i];
                carry = 1;
            } else if ( num2[i] || num2[i] === 0 ) {
                diff = num1[i] - num2[i] - carry;
                carry = 0;
            } else if ( !num2[i] && carry && i !== len - 1 ) {
                diff = this.convertToTenMillion( num1[i] ) - carry;
            } else if ( i === num1.length - 1 ) {
                diff = num1[i] - carry;
            } else {
                diff = num1[i];
                carry = 0;
            }
            container.push( diff );
        }
        return this.handleZeros( container.reverse() ).join( '' );
    };

    add_big_numbers = (num1, num2) => {
        const [num1Sign, num2Sign] = this.getNumbersSign( num1, num2 );

        // Addend 1 is negative
        if ( num1Sign && !num2Sign ) {
            const isSubtrahendBigger = this.isSubtrahendBigger( num1, num2 );
            if ( isSubtrahendBigger ) {
                return this.subtract_big_numbers( num2, num1.substring(1));
            }
            return `-${this.subtract_big_numbers( num1.substring( 1 ), num2 )}`;
        }

        // Addend 2 is negative
        if ( !num1Sign && num2Sign ) {
            const isSubtrahendBigger = this.isSubtrahendBigger( num1, num2 );
            if (isSubtrahendBigger) {
                return `-${this.subtract_big_numbers(num2.substring(1), num1)}`;
            }
            return this.subtract_big_numbers( num1, num2.substring( 1 ) );
        }

        // Both Addends negative
        if ( num1Sign && num2Sign ) {
            return `-${this.add_big_numbers( num1.substring( 1 ), num2.substring( 1 ))}`;
        }

        num1 = this.splitNumbers( num1 );
        num2 = this.splitNumbers( num2 );

        const lenDiff = num1.length - num2.length;
        const biggerArr = lenDiff >= 0 ? num1 : num2;
        const shorterArr = lenDiff >= 0 ? num2 : num1;
        const container = [];
        let carry = 0;
        for ( let i = 0; i < shorterArr.length; i++ ) {
            let sum = ( +shorterArr[i] + +biggerArr[i] + carry ).toString();
            const zerosCount = 7 - sum.length;
            if ( zerosCount > 0 && /^0/.test( sum ) ) {
                sum = `${'0'.repeat( zerosCount )}${sum}`;
            }
            if ( sum.length > 7 ) {
                sum = sum.slice( 1 );
                carry = 1;
            } else if ( sum.length < 7 && /^0/.test( shorterArr[i] ) ) {
                sum = `${'0'.repeat( zerosCount )}${sum}`;
            } else {
                carry = 0;
            }
            container.push( sum );
        }
        container.push( ...biggerArr.slice( biggerArr.length - Math.abs( lenDiff ) ) );
        return carry ? carry + container.reverse().join( '' ) : container.reverse().join( '' );
    };
}


const bigInt_1 = new CustomBigInt();

// console.log( bigInt_1.add_big_numbers( '8489498498416516584984186951891894865148941',
//                                                  '574394984984165165849841869518918' ),
//                                              '8489498498990911569968352117741736734667859');
// console.log( bigInt_1.add_big_numbers( '555555500000011', '44444450000000' ), '599999950000011' );
// console.log( bigInt_1.add_big_numbers( '40000000', '60000000' ), '100000000' );
// console.log( bigInt_1.add_big_numbers( '55555555', '44444445' ), '100000000' );
// console.log( bigInt_1.add_big_numbers( '1000000000000000000', '4999999' ), '1000000000004999999' );
// console.log( bigInt_1.add_big_numbers( '-100000000000', '-111149934569' ), '-211149934569' );
// console.log( bigInt_1.add_big_numbers( '-111149934569', '-100000000000' ), '-211149934569' );
// console.log( bigInt_1.add_big_numbers( '-100000000000', '111149934569' ), '11149934569' );
// console.log( bigInt_1.add_big_numbers( '-111149934569', '100000000000' ), '-11149934569' );
// console.log( bigInt_1.add_big_numbers( '111149934569', '-100000000000' ), '11149934569' );
// console.log( bigInt_1.add_big_numbers( '100000000000', '-111149934569' ), '-11149934569' );
// console.log( bigInt_1.add_big_numbers( '-1000000000000000000', '4999999' ), '999999999995000001' );

// console.log( bigInt_1.subtract_big_numbers(
//         '988489498498416516584984186951891894865148941', '8416516584984186951891894865148941' ),
//     '988489498490000000000000000000000000000000000' );
// console.log( bigInt_1.subtract_big_numbers( '85218124291', '18124295' ), '85199999996' );
// console.log( bigInt_1.subtract_big_numbers( '-100000000000', '-111149934569' ), '11149934569' );
// console.log( bigInt_1.subtract_big_numbers( '-111149934569', '-100000000000' ), '-11149934569' );
// console.log( bigInt_1.subtract_big_numbers( '-100000000000', '111149934569' ), '-211149934569' );
// console.log( bigInt_1.subtract_big_numbers( '-111149934569', '100000000000' ), '-211149934569' );
// console.log( bigInt_1.subtract_big_numbers( '111149934569', '-100000000000' ), '211149934569' );
// console.log( bigInt_1.subtract_big_numbers( '100000000000', '-111149934569' ), '211149934569' );
// console.log( bigInt_1.subtract_big_numbers( '1000000000000000000', '4999999' ), '999999999995000001' );
// console.log( bigInt_1.subtract_big_numbers( '56744444444444444', '44443334444333' ), '56700001110000111' );


log();

function log() {
    console.log( bigInt_1.add_big_numbers( '8489498498416516584984186951891894865148941',
            '574394984984165165849841869518918' ) ===
        '8489498498990911569968352117741736734667859' );
    console.log( bigInt_1.add_big_numbers( '555555500000011', '44444450000000' ) === '599999950000011' );
    console.log( bigInt_1.add_big_numbers( '40000000', '60000000' ) === '100000000' );
    console.log( bigInt_1.add_big_numbers( '55555555', '44444445' ) === '100000000' );
    console.log( bigInt_1.add_big_numbers( '1000000000000000000', '4999999' ) === '1000000000004999999' );
    console.log( bigInt_1.add_big_numbers( '-100000000000', '-111149934569' ) === '-211149934569' );
    console.log( bigInt_1.add_big_numbers( '-111149934569', '-100000000000' ) === '-211149934569' );
    console.log( bigInt_1.add_big_numbers( '-100000000000', '111149934569' ) === '11149934569' );
    console.log( bigInt_1.add_big_numbers( '-111149934569', '100000000000' ) === '-11149934569' );
    console.log( bigInt_1.add_big_numbers( '111149934569', '-100000000000' ) === '11149934569' );
    console.log( bigInt_1.add_big_numbers( '100000000000', '-111149934569' ) === '-11149934569' );
    console.log( bigInt_1.add_big_numbers( '-1000000000000000000', '4999999' )=== '-999999999995000001' );

    console.log( bigInt_1.subtract_big_numbers(
            '988489498498416516584984186951891894865148941', '8416516584984186951891894865148941' ) ===
        '988489498490000000000000000000000000000000000' );
    console.log( bigInt_1.subtract_big_numbers( '85218124291', '18124295' ) === '85199999996' );
    console.log( bigInt_1.subtract_big_numbers( '-100000000000', '-111149934569' ) === '11149934569' );
    console.log( bigInt_1.subtract_big_numbers( '-111149934569', '-100000000000' ) === '-11149934569' );
    console.log( bigInt_1.subtract_big_numbers( '-100000000000', '111149934569' ) === '-211149934569' );
    console.log( bigInt_1.subtract_big_numbers( '-111149934569', '100000000000' ) === '-211149934569' );
    console.log( bigInt_1.subtract_big_numbers( '111149934569', '-100000000000' ) === '211149934569' );
    console.log( bigInt_1.subtract_big_numbers( '100000000000', '-111149934569' ) === '211149934569' );
    console.log( bigInt_1.subtract_big_numbers( '1000000000000000000', '4999999' ) === '999999999995000001' );
    console.log( bigInt_1.subtract_big_numbers( '5674444444', '4444333' ) === '5670000111' );
    console.log( bigInt_1.add_big_numbers( '1000000000000000000', '4999999' ) === '1000000000004999999' );
}

