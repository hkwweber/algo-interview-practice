/*palindrome checker

laziest - string === string.split('').reverse().join(''); //would this be O(3n) => O(n) ?

*/

//approach - O(n) time with pointers O(1) space
function isPalindrome(string) {
	let leftIdx = 0;
	let rightIdx = string.length-1;
	while (leftIdx < rightIdx) {
		if (string[leftIdx] === string[rightIdx]) {
			leftIdx ++;
			rightIdx --;
		}
		else return false;
	}
	return true;
}
