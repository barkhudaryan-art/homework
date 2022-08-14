const cachedFibonacci = n => {
    console.log( 'cached Fibonacci' );
    if ( n < 2 ) return n;

    cachedFibonacci.cache = cachedFibonacci.cache || [];

    if ( !cachedFibonacci.cache[n] ) {
        cachedFibonacci.cache[n] = cachedFibonacci( n - 1 ) + cachedFibonacci( n - 2 );
    }

    return cachedFibonacci[n];
};

cachedFibonacci( 5 );
cachedFibonacci( 6 );
cachedFibonacci( 5 );