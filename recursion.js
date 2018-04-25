/* Fibonacci
the first number of the sequence is 0
the second number is 1
the nth number is the sum of (n-1) and (n-2)
*/

//first approach - time complexity isn't great: O(2^n) - every time we're doing 2 times 2 times 2 and we're doing it n times
//space: O(n)
//we're doing lots of duplicate calculations
//for every call of fib, we do 2 additional calls of fib
function getNthFib(n) {
	if (n === 1) return 0;
	if (n === 2) return 1;
	return (getNthFib(n-1) + getNthFib(n-2));
}

//second approach - caching (memoization)
//O(n) time and O(n) space - once you calculate fib of that one number, you store it and it becomes a constant lookup. space complexity is O(n) bc you store all fibs in an object
function getNthFib(n, cache = {1: 0, 2: 1}) {
	if (n in cache) {
		return cache[n];
	}
	cache[n] = getNthFib(n-1, cache) + getNthFib(n-2, cache)
	return cache[n];
}
