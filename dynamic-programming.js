/* MAX SUBSET NO ADJACENT ********************************
take in array of positive int and return an integer representing the max sum of non-adjacent elements in the array. if no sum can be generated, return 0.

*/

function maxSubsetSumNoAdjacent(array) { //O(n) time, O(n) space
	//a couple edge cases:
  if (!array.length) return 0;
	if (array.length ===1) return array[0];

	let maxSumArr = [array[0], Math.max(array[0], array[1])]; //initialize first two elements of max sum array
	for (let i = 2; i < array.length; i++) { //O(n)
		let larger = Math.max(maxSumArr[i-1], maxSumArr[i-2] + array[i]);
		maxSumArr[i] = larger;
	}
	return Math.max(...maxSumArr);
}
