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

function caesarCipherEncryptor(string, key) { //O(2n) ==> O(n)
	const alpha = 'abcdefghijklmnopqrstuvwxyz'; //0(1) space (unless we have some crazy long other alphabet)
	let newArr = []; //0(1)
	for (let i = 0; i < string.length; i++) { //O(n)
		let currAlphaPos = alpha.indexOf(string[i]) //O(26) ==> 0(1)
		let nextAlphaPos = (currAlphaPos + key)%26; //0(1)
		newArr[i] = alpha[nextAlphaPos]; //0(1) //whereas if you were just concatenating a string this would be O(n)
	}
	return newArr.join('');  //think this must be 0(n)
}

// or this, which is the same but has more specific logic about modulo
function caesarCipherEncryptor(string, key) {
	key = key%26;
	const alpha = 'abcdefghijklmnopqrstuvwxyz';
	let newArr = [];
	for (let i = 0; i < string.length; i++) {
		let currAlphaPos = alpha.indexOf(string[i])
		let nextAlphaPos = currAlphaPos + key;
		if (nextAlphaPos <= 25) {
			newArr[i] = alpha[nextAlphaPos];
		}
		else {
			nextAlphaPos = -1 + nextAlphaPos%25;
		}
		newArr[i] = alpha[nextAlphaPos];
	}
	return newArr.join('');
}


/* LONGEST PALINDROMIC SUBSTRING
*/

//first attempt:

function longestPalindromicSubstring(string) {
	let long = '';
	if (string.length === 1) return string;
	for (let i = 1; i < string.length -1; i++) {
		let palItEven = palIt(string, i-1, i+1, long);
		let palItOdd = palIt(string, i, i+1, long);
		long = palItOdd.length > palItEven.length ? palItOdd : palItEven;

	}
	return long;
}

//helper func
function palIt(string, leftIdx, rightIdx, long) {
	while (leftIdx > -1 && rightIdx < string.length) {
			if (string[leftIdx] === string[rightIdx]) {
				let subStr = string.slice(leftIdx, rightIdx+1);
				long = subStr.length > long.length ? subStr : long;
				leftIdx --;
				rightIdx ++;
			}
			else break;
		}
	return long;
}
