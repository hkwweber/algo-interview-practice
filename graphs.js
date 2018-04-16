/*DEPTH-FIRST SEARCH
you're given a node class that has a name and an array of optional children nodes. when put together, nodes form a tree-like structure. implement the depthfirst search method on the node class, which takes in an empty array, traverses the tree using the depth first search, stores all the nodes' names in the input array, and returns it.
*/

//depth first is this node, left child, right child

class Node {
	constructor(name) {
		this.name = name;
		this.children = [];
	}

	addChild(name) {
		this.children.push(new Node(name));
		return this;
	}

	depthFirstSearch(array) {
		array.push(this.name); //O(1)
		for (let i = 0; i < this.children.length; i++) { //O(n)
			array = array.concat(this.children[i].depthFirstSearch([])); //i would assume that the concat method is an O(n) operation
		}
		return array;
	}
}
