function* generatePrimes(limit) {
  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) {
      yield num;
    }
  }
}

// Usage of the generator function
const primeLimit = 50;
const primeGenerator = generatePrimes(primeLimit);

for (const prime of primeGenerator) {
  console.log(prime);
}
