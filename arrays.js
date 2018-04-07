/*
TWO NUMBER SUM
write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. if any two nums in the array sum up to the target, return them in an array in sorted order. If no two nums sum up to target, return empty array. Assume there will be at most one pair of nums summing up to the target.
*/

function twoNumberSum(array, targetSum) {
	let memSet = new Set();
	for (let i = 0; i < array.length; i++) {
		let curr = array[i];
		let match = targetSum - curr;
		if (memSet.has(match)) {
			return [Math.min(curr, match), Math.max(curr, match)]
			//or:
			// return [curr, match].sort((a,b) => a-b);
		}
		memSet.add(curr);
	}
	return [];
}
