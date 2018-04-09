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
			else {rightIdx--};
		}
	}
	return finalArr;
}
