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






/*caeser cipher encryptor
take a string and a key. return a new 'encrypted' string where each letter is now the letter k positions over in the alphabet
so: ('abc', 2) ==> 'cde' and: ('xyz', 3) ==> 'abc'

things i always forget - modulo operator does unintuitive things (at least to me)
if your first operand is greater than your second, gives you the remainder after dividing:
27%25 ==> 2
if your first operand is less than your second, you get just that first operand back:
23%25 ==> 23
*/

function caesarCipherEncryptor(string, key) {
	const alpha = 'abcdefghijklmnopqrstuvwxyz';
	let newStr = '';
	for (let i = 0; i < string.length; i++) {
		let currAlphaPos = alpha.indexOf(string[i])
		let nextAlphaPos = (currAlphaPos + key)%26;
		newStr += alpha[nextAlphaPos];
	}
	return newStr;
}
