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


/*RIVER SIZES ********************************************************
given a two dimensional array of potentially unequal height and width containing only Os and 1s. each 0 represents land and each 1 represents part of a river. a river consisnts of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent). the number of adjacent 1st form a river determine its size. write a func that retursn an array of the sizes of all rivers represented in the input matrix. sizes do not need to be in any order.

treat as a graph
treat every element in matrix as a node
each node has 4 neighboring nodes - above, below, left, right
if node has val 1, it's part of river
keep track of nodes we've visited, and skip it if we've already been there

time: O(n) (or w * h) where n is number of nodes. we're just visiting every node once
space: the same - building auxilary data structure to track whether its been visited
*/
function riverSizes(matrix) {
	let sizes = [],
  		visited = [];
	matrix.forEach(el => {
		visited.push(el.map(innerEl => false));
	})
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (visited[i][j]) continue;
			traverseNode(i, j, matrix, visited, sizes);
		}
	}
	return sizes;
}

function traverseNode(i, j, matrix, visited, sizes) {
	let currRiverSize = 0;
	let nodesToExplore = [[i,j]]
	while (nodesToExplore.length) {
		let currNode = nodesToExplore.pop();
		let i = currNode[0];
		let j = currNode[1];
		if (visited[i][j]) continue;
		visited[i][j] = true;
		if (matrix[i][j] === 0) continue;
		currRiverSize += 1;
		let unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
		unvisitedNeighbors.forEach(neighbor => nodesToExplore.push(neighbor));
	}
	if (currRiverSize) sizes.push(currRiverSize);
}

function getUnvisitedNeighbors(i, j, matrix, visited) {
	let unvisited = [];
	if (i > 0 && !visited[i-1][j]) unvisited.push([i-1,j]);
	if (i < matrix.length-1 && !visited[i+1][j]) unvisited.push([i+1,j]);
	if (j > 0 && !visited[i][j-1]) unvisited.push([i, j-1]);
	if (j < matrix[i].length-1 && !visited[i][j+1]) unvisited.push([i, j+1]);
	return unvisited;
}
