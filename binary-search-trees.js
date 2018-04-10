/* find closest value in BST***************************************************
given BST data structure consisting of BST nodes. Each node has value (integer), and left and right (children). a node is a BST only if its value is greater than the vals of every node to its left, its value is less than or equal to the values of every node to its right, and both children nodes are either BST nodes or null values. also given target integer. write a func that finds the closest value to that target value. assume there will only be one closest value

*/

// first attempt:
function findClosestValueInBst(tree, target) {
  let closest = Infinity;

	//helper function to recurse
	const recurser = curr => {
		if (!curr) return;
		let currDiff = Math.abs(curr.value - target);
		let closestDiff = Math.abs(closest - target);
		if (currDiff < closestDiff) {
			closest = curr.value;
		}
		if (target < curr.value) recurser(curr.left);
		if (target > curr.value) recurser(curr.right);
	};
	recurser(tree);
	return closest;
}

//with a while loop:
function findClosestValueInBst(tree, target) {
  let closest = {val: null, diff: Infinity};
	let curr = tree;
	while (curr) {
		let currDiff = Math.abs(curr.value - target);
		if (currDiff < closest.diff) {
			closest = {val: curr.value, diff: currDiff};
		}
		if (target < curr.value) curr = curr.left;
		else if (target > curr.value) curr = curr.right;
		else break;
	}
	return closest.val;
}


/*  BST CONSTRUCTION *********************************************************
write a BST class
should have value prop, left and right props should point to null or another BST
rules: its value is greater than the values of every node to its left. its value is less than or equal to the values of every node to its right.
should support insertion, searching, and removal of values
removal method should only remove the first instance of the target value

*/
