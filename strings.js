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

////////////////////first attempt:
function longestPalindromicSubstring(string) {
	let long = ''; //O(1)
	if (string.length === 1) return string; //deal with edge case
	for (let i = 1; i < string.length -1; i++) { //o(n)
		let palItEven = palIt(string, i-1, i+1, long); //O(n^2)
		let palItOdd = palIt(string, i, i+1, long); //O(n^2)
		long = palItOdd.length > palItEven.length ? palItOdd : palItEven; //O(1)

	}
	return long;
}
//helper func
function palIt(string, leftIdx, rightIdx, long) { //O(n^2) - factoring in slice method
	while (leftIdx > -1 && rightIdx < string.length) { //O(n) where n is string length ? worst case?
			if (string[leftIdx] === string[rightIdx]) {
				let subStr = string.slice(leftIdx, rightIdx+1); // O(n) i believe - slice
				long = subStr.length > long.length ? subStr : long; //O(1)
				leftIdx --;//O(1)
				rightIdx ++;//O(1)
			}
			else break;
		}
	return long;
}


function longestPalindromicSubstring(string) { //O(n^2) time, O(1) space
	let longStart = 0;
	let longEnd = 0;
	if (string.length === 1) return string;
	for (let i = 1; i < string.length -1; i++) { //O(n) everything inside loop ==> O(n^2)
		let palItEven = palIt(string, i-1, i+1, longStart, longEnd); //O(n)
		let palItOdd = palIt(string, i, i+1, longStart, longEnd);//O(n)
		let newLongest = palItEven.longEnd - palItEven.longStart > palItOdd.longEnd - palItOdd.longStart ? palItEven : palItOdd;
		longStart = newLongest.longStart;
		longEnd = newLongest.longEnd;
	}
	return string.slice(longStart, longEnd+1); //O(n)
}

function palIt(string, leftIdx, rightIdx, longStart, longEnd) {
	while (leftIdx > -1 && rightIdx < string.length) {
			if (string[leftIdx] === string[rightIdx]) {
				let currDiff = rightIdx - leftIdx;
				let longDiff = longEnd - longStart;
				if (currDiff > longDiff) {
					longStart = leftIdx;
					longEnd = rightIdx;
				}
				leftIdx --;
				rightIdx ++;
			}
			else break;
		}
	return {longStart, longEnd};
}
