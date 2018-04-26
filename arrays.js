/*
*****************************************************TWO NUMBER SUM**********
write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. if any two nums in the array sum up to the target, return them in an array in sorted order. If no two nums sum up to target, return empty array. Assume there will be at most one pair of nums summing up to the target.
*/

function twoNumberSum(array, targetSum) {
	let memSet = new Set();
	for (let i = 0; i < array.length; i++) {
		let curr = array[i];
		let match = targetSum - curr;
		if (memSet.has(match)) {
			return [Math.min(curr, match), Math.max(curr, match)];
			//or:
			// return [curr, match].sort((a,b) => a-b);
		}
		memSet.add(curr);
	}
	return [];
}

/*
*****************************************************THREE NUMBER SUM*******
most naive - use three for loops O(n^3)
*/
function threeNumberSum(array, targetSum) {
	let finalArr = [];
	array = array.sort((a,b) => a-b);
	for (let i = 0; i < array.length; i++) {
		let firstNum = array[i];
		for (let j = i + 1; j < array.length; j++) {
			let secondNum = array[j];
			for (let k = j + 1; k < array.length; k++) {
				let thirdNum = array[k];
				if (firstNum + secondNum + thirdNum === targetSum) {
					finalArr.push([firstNum, secondNum, thirdNum].sort((a, b) => a - b));
				}
			}
		}
	}
	return finalArr;
}
/*
best technique:
sort array in ascending order
then use left and right pointer
*/

function threeNumberSum(array, targetSum) {
  let finalArr = [];
  array = array.sort((a, b) => a-b);
	for (let i = 0; i < array.length; i++) {
		let num = array[i];
		let leftIdx = i +1;
		let rightIdx = array.length -1;
		while (leftIdx < rightIdx) {
			let sum = num + array[leftIdx] + array[rightIdx];
			if (sum === targetSum) {
				finalArr.push([num, array[leftIdx], array[rightIdx]]);
				leftIdx++;
				rightIdx--;
			}
			else if (sum < targetSum) {leftIdx ++}
			else {rightIdx--}
		}
	}
	return finalArr;
}


/*
SMALLEST DIFFERENCE
write a function that takes in two non-empty arrays of integers. find the pair of numbers (one from first array, one from second array) whose absolute difference is closest to zero. return an array containing these two numbers, with the number from the first array in the first position. assume there will only be one pair of nums with the smallest difference
*/
function smallestDifference(arrayOne, arrayTwo) { //O(n log n) + O(m log m) (n is arrayone length, m is arraytwo length) // O(1) space complexity
	arrayOne.sort((a,b) => a > b); //O(n log n)
	arrayTwo.sort((a,b) => a > b); //O(m log m)
	let onePointer = 0,
			twoPointer = 0,
			smallestDiff = Infinity,
			resArr = [];
	while (onePointer < arrayOne.length && twoPointer < arrayTwo.length) { //O(n + m)
		let oneVal = arrayOne[onePointer],
				twoVal = arrayTwo[twoPointer],
				currDiff = Math.abs(oneVal- twoVal);
		if (oneVal === twoVal) return [oneVal, twoVal];
		if (currDiff < smallestDiff) {
			smallestDiff = currDiff;
			resArr = [oneVal, twoVal];
		}
		if (oneVal < twoVal) onePointer++;
		else twoPointer++;
	}
	return resArr;
}
