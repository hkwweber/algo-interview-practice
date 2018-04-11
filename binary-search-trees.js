/*
 find closest value in BST***************************************************
given BST data structure consisting of BST nodes. Each node has value (integer), and left and right (children). a node is a BST only if its value is greater than the vals of every node to its left, its value is less than or equal to the values of every node to its right, and both children nodes are either BST nodes or null values. also given target integer. write a func that finds the closest value to that target value. assume there will only be one closest value


avg time complexity - o log n
worst time complexity - o n  (if each node only has one branch - must look at every node)
recursive function - avg space complexity - o log n - adding n frames on call stack. worst case is o n
iteratively - time complexity is the same but space complexity is only o(1) since we're not adding frames to the callstack, only storing and changing a variable
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
	let closest = Infinity;
	let curr = tree;
	while (curr) {
		if (Math.abs(curr.value - target) < Math.abs(closest - target)) {
			closest = curr.value;
		}
		if (target < curr.value) curr = curr.left;
		else if (target > curr.value) curr = curr.right;
		else break;
	}
	return closest;
}

/*  BST CONSTRUCTION *********************************************************
write a BST class
should have value prop, left and right props should point to null or another BST
rules: its value is greater than the values of every node to its left. its value is less than or equal to the values of every node to its right.
should support insertion, searching, and removal of values
removal method should only remove the first instance of the target value



removal -- grab smallest val in right subtree of the node you want to remove
replace node to remove with that smallest val from right subtree
remove that smallest val node

*/

class BST {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}

	insert(value) {
		let currTree = this;
		let direction = value < currTree.value ? "left" : "right";
		if (currTree[direction]) currTree[direction].insert(value);
		else currTree[direction] = new BST(value);
		return this;
	}

	contains(value) {
		let currTree = this;
		if (currTree.value === value) return true;
		let direction = value < currTree.value ? "left" : "right";
		if (currTree[direction]) return currTree[direction].contains(value);
		return false;
	}

//passed all but two edge cases for my remove solution, so this is algo's remove solution below
	remove(value, parent = null) {
		if (value < this.value) {
			if (this.left) {
				this.left.remove(value, this);
			}
		} else if (value > this.value) {
			if (this.right) {
				this.right.remove(value, this);
			}
		} else {
			if (this.left && this.right) {
				this.value = this.right.findSmallestValue();
				this.right.remove(this.value, this);
			} else if (!parent) {
				if (this.left) {
					this.value = this.left.value;
					this.right = this.left.right;
					this.left = this.left.left;
				} else if (this.right) {
					this.value = this.right.value;
					this.left = this.right.left;
					this.right = this.right.right;
				} else this.value = null;
			} else if (parent.left === this) {
				parent.left = this.left ? this.left : this.right;
			} else if (parent.right === this) {
				parent.right = this.left ? this.left : this.right;
			}
		}
		return this;
	}

	findSmallestValue() {
		let currTree = this;
		while (currTree) {
			if (currTree.left) currTree = currTree.left;
			else break;
		}
		return currTree.value;
	}
}
