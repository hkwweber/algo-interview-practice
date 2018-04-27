/*DEPTH-FIRST SEARCH
you're given a node class that has a name and an array of optional children nodes. when put together, nodes form a tree-like structure. implement the depthfirst search method on the node class, which takes in an empty array, traverses the tree using the depth first search, stores all the nodes' names in the input array, and returns it.
*/

//depth first is this node, left child, right child
//depth first time - O(v + e) num vertices num edges
//space complexity - worst case is O(v) because you'd have v frames on the callstack if every node had one child. best case is O(d) where d is the depth of the tree. also, this doesn't count the array we're creating, which would be O(v) anyway.

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
		for (let i = 0; i < this.children.length; i++) {
			//O(n)
			this.children[i].depthFirstSearch(array);
		}
		return array;
	}
}

/*BREADTH-FIRST SEARCH ******************************************************************
given a node class that has a name and an array of optional children nodes. when put together, nodes form a simple tree-like structure. implement the breadthfirstsearch method on the node class, which takes in an empty array, traverses the tree using the breadth-first search approach, stores all the nodes' names in the input array, and returns it.

vertices - the nodes
edges - lines that connect the nodes
time: O(v + e) //we traverse every node, so we def have O(v). also, for every node, we add its children nodes to the queue, which is the number of its edges
space: O(v) - storing an array of v node names. also, we have a queue

*/
class Node {
	constructor(name) {
		this.name = name;
		this.children = [];
	}

	addChild(name) {
		this.children.push(new Node(name));
		return this;
	}

	breadthFirstSearch(array) {
		//initialize a queue with this
		let queue = [this];
		//while there is anything in the queue
		while (queue.length) {
			//want to remove first node from queue and add its name to the array
			let curr = queue.shift(); //O(1)
			array.push(curr.name);
			//after that, want to push all children into the queue
			curr.children.forEach(node => queue.push(node));
		}
		return array;
	}
}
