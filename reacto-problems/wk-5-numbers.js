//add without using the + operator!!! use bitwise operators

function add(a, b) {
	while (b !== 0) {
		const uncarried = a ^ b;
		const carries = (a & b) << 1;
		a = uncarried;
		b = carries;
		// ^^ reseting `a` and `b` like this will ensure we continue XOR and AND ing the new values for the next cycle of the loop
	}
	return a;
}
//recursive approach
// const recursiveAdd = (a, b) => {
// 	// Base case is that there is no more uncarried value.
// 	if (b === 0) return a;
// 	// Grab the raw bit addition through XOR
// 	const uncarried = a ^ b;
// 	// Check to see if there are any 'collisions' aka carry overs
// 	const carried = (a & b) << 1;
// 	// Call add again with new values
// 	return recursiveAdd(uncarried, carried);
// };
// or even shorter recursive approach
const recursiveAdd = (a, b) => (b === 0 ? a : recursiveAdd(a ^ b, (a & b) << 1));

//gist i made for this problem including explanations of bitwise operators: https://gist.github.com/hkwweber/213da0f8c9eda4aa4eb5205dd8a9166d

