/* BINARY SEARCH ********************************************************
takes in a sorted array of integers as well as a target integer. function should use binary search algo to find if the target number is contained in the array. return index or -1 if not within array
*/


//recursive solution: O(log n) time and space complexity
function binarySearch(array, target, startIdx = 0, endIdx = array.length-1) {
	//base case
	if (endIdx === startIdx) {
		return array[startIdx] === target ? startIdx : -1;
	}
	//recursive case
	let splitIdx = Math.floor((endIdx + startIdx)/2);
	let splitPoint = array[splitIdx];
	if (splitPoint === target) return splitIdx;
	if (splitPoint < target) {
		//look at array to the right of split point
		return binarySearch(array,target,splitIdx+1, endIdx);
	}
	else if (splitPoint > target) {
		//look at array to the left of split point
		return binarySearch(array, target, startIdx, splitIdx-1);
	}
}

//iterative solution: still O(log n) time but down to constant space w/o recursion
function binarySearch(array, target) {
	let startIdx = 0;
	let endIdx = array.length-1;
	while (endIdx !== startIdx) {
		let splitIdx = Math.floor((endIdx + startIdx)/2);
		let splitPoint = array[splitIdx];
		if (splitPoint === target) return splitIdx;
		if (splitPoint < target) {
			startIdx = splitIdx +1;
		}
		else if (splitPoint > target) {
			endIdx = splitIdx -1;
		}
	}
	return array[startIdx] === target ? startIdx : -1;
}


/*
FIND THREE LARGEST NUMBERS*****************************************************
takes array and returns a sorted array of three largest integers. should return duplicate integers if necessary
*/

function findThreeLargestNumbers(array) { //O(n log n) time, o(1) space
 array = array.sort((a,b) => b - a)
	let res = [array[2], array[1],array[0]];
	return res;
}

function findThreeLargestNumbers(array) { //O(n), constant space
 let largest = [-Infinity, -Infinity, -Infinity];
 for (let i = 0; i < array.length; i++) {
	let curr = array[i];
	if (curr > largest[2]) {
		largest[0] = largest[1];
		largest[1] = largest[2];
		largest[2] = curr;
	}
	 else if (curr > largest[1]) {
		 largest[0] = largest[1];
		 largest[1] = curr;
	 }
	 else if (curr > largest[0]) {
		 largest[0] = curr;
	 }
 }
	return largest;
}
