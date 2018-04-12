/*palindrome checker

laziest - string === string.split('').reverse().join(''); //would this be O(3n) => O(n) ?

*/

// first approach - O(n) time with pointers
function isPalindrome(string) {
	let rightIdx = Math.floor(string.length/2);
	let leftIdx = rightIdx - 1;
	if (string.length%2) rightIdx ++;
	while (leftIdx >= 0 && rightIdx < string.length) {
		if (string[leftIdx] === string[rightIdx]) {
			leftIdx--;
			rightIdx ++;
		}
		else return false;
	}
	return true;
}
