//given a binary tree represented in an array, find which side of the tree is greater. greater means that the sum of all its nodes is greater than the sum of all the other tree's nodes. return 'Left' if it's the left tree and 'Right' if right.

//O(d) space complexity where d is the depth of the tree
//O(n) time since you have to visit every node once

const sumTree = (arr, startIdx) => {
	let sum = 0;
	if (!arr[startIdx]) {
		return sum;
	} else {
		sum += arr[startIdx];
		sum += sumTree(arr, 2 * startIdx + 1);
		sum += sumTree(arr, 2 * startIdx + 2);
	}
	return sum;
};

const findBigger = arr => {
	let leftStart = 1,
		rightStart = 2,
		leftSum = sumTree(arr, leftStart),
		rightSum = sumTree(arr, rightStart);
	return leftSum > rightSum ? "Left" : "Right";
};

const arr = [3, 6, 2, 9, -1, 10];

findBigger(arr);
