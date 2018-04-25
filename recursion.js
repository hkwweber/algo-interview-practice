/* Fibonacci
the first number of the sequence is 0
the second number is 1
the nth number is the sum of (n-1) and (n-2)
*/

function getNthFib(n) {
	if (n === 1) return 0;
	if (n === 2) return 1;
	return (getNthFib(n-1) + getNthFib(n-2));
}
