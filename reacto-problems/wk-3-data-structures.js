//PRIORITY QUEUE ************************************************************************

//linked list implementation - O(n) space, constant time operations except for insert, which is O(n)
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.next = null;
	}
}

class PriorityQueue {
	constructor() {
		this.first = null;
	}

	insert(data, priority) {
		//O(n) time where n is num of nodes
		let toInsert = new Node(data, priority);
		if (!this.first || toInsert.priority > this.first.priority) {
			toInsert.next = this.first;
			this.first = toInsert;
		} else {
			let curr = this.first;
			while (curr.next && curr.next.priority >= toInsert.priority) {
				curr = curr.next;
			}
			toInsert.next = curr.next;
			curr.next = toInsert;
		}
	}

	peek() {
		//O(1)
		return this.first;
	}

	popMax() {
		//O(1)
		let toRemove = this.first;
		this.first = toRemove.next;
		return toRemove;
	}
}

//HEAP IMPLEMENTATION
class PriorityQueue {
	//space complexity - O(n) //O(log n) time for insertion and popmax, O(1) still for peek
	constructor() {
		this.queue = [];
	}

	insert(data, priority) {
		this.queue.push({ data, priority });
		this.siftUp();
	}

	peek() {
		return this.queue[0];
	}

	swap(idx1, idx2) {
		let temp = this.queue[idx1];
		this.queue[idx1] = this.queue[idx2];
		this.queue[idx2] = temp;
	}

	popMax() {
		let toRemove = this.queue[0];
		this.queue[0] = this.queue[this.queue.length - 1];
		this.queue.pop();
		this.siftDown();
		return toRemove;
	}

	siftUp() {
		let toSiftIdx = this.queue.length - 1;
		let parentIdx = Math.floor((toSiftIdx - 1) / 2);
		while (
			this.queue[parentIdx] &&
			this.queue[toSiftIdx].priority > this.queue[parentIdx].priority
		) {
			this.swap(toSiftIdx, parentIdx);
			toSiftIdx = parentIdx;
			parentIdx = Math.floor((toSiftIdx - 1) / 2);
		}
	}

	siftDown() {
		let toSiftIdx = 0;
		let left = 1;
		let right = 2;
		let maxIdx;
		if (this.queue[left].priority > this.queue[right].priority) {
			maxIdx = left;
		} else maxIdx = right;
		while (
			this.queue[maxIdx] &&
			this.queue[toSiftIdx].priority < this.queue[maxIdx].priority
		) {
			this.swap(toSiftIdx, maxIdx);
			toSiftIdx = maxIdx;
			left = 2 * maxIdx + 1;
			right = 2 * maxIdx + 2;
			if (!this.queue[left] && !this.queue[right]) break;
			else if (
				!this.queue[right] ||
				this.queue[left].priority > this.queue[right].priority
			) {
				maxIdx = left;
			} else maxIdx = right;
		}
	}
}

//test cases:
// const pq = new PriorityQueue();
// pq.insert('Jill, concussion', 7);
// pq.insert('John, stomach pain', 5);
// pq.peek() // ==> 'Jill, concussion'
// pq.peek() // ==> 'Jill, concussion'  // Jill is still in the PQ
// pq.insert('Dave, sprained ankle', 1);
// pq.insert('Bob, breathing problems', 8)
// pq.peek() // ==> 'Bob, breathing problems'
// pq.popMax() // ==> 'Bob, breathing problems'
// pq.peek() // ==> 'Jill, concussion' // Bob has been removed from the PQ

//TREE TRAVERSAL ***************************************************************

// Each of these function will take a node of the tree and a callback. The function will iterate through the child nodes, calling the callback function on each of them. The difference between them is the order in which they iterate.

function node(value) {
	return {
		value,
		children: []
	};
}
var a = node("a");
var b = node("b");
var c = node("c");
var d = node("d");
var e = node("e");
var f = node("f");
var g = node("g");
var h = node("h");
var i = node("i");
var j = node("j");
var k = node("k");
var l = node("l");
var m = node("m");
a.children.push(b, c, d);
b.children.push(e);
e.children.push(k, l);
c.children.push(f, g, h);
h.children.push(m);
d.children.push(i, j);

// breadthFirst
function breadthFirst(node, cb) {
	let queue = [node];
	while (queue.length) {
		node = queue.shift();
		cb(node);
		queue.push(...node.children);
	}
}

function ccc(thing) {
	console.log(thing.value);
}

//root, then children
function depthFirstPreOrder(node, cb) {
	cb(node);
	node.children.forEach(child => depthFirstPreOrder(child, cb));
}
//children, then root
function depthFirstPostOrder(node, cb) {
	node.children.forEach(child => depthFirstPostOrder(child, cb));
	cb(node);
}

breadthFirst(a, ccc);
depthFirstPreOrder(a, ccc);
depthFirstPostOrder(a, ccc);

////PREFIX SEARCH ************************v******************************************
// Given a "book" and a string to search for, return an array of the character indices for every word in the book that begins with that string.
// The book will contain two things: a book id and a string of English text. The search should be case insensitive.
// Follow-up: consider the possibility of repeated searches through the same book.


//naive approach - O(n*m) time complexity where n is book length and m is str length
function findWordsStartingWith(book, str) {
	book.text = book.text.toLowerCase();
	str = str.toLowerCase();
	let results = [];
	for (let i = 0; i < book.text.length; i++) {
		if (i !== 0 && book.text[i - 1] !== " ") continue;
		for (let j = 0; j < str.length; j++) {
			if (book.text[i + j] !== str[j]) break;
			if (j === str.length - 1) results.push(i);
		}
	}
	return results;
}

//OPTIMIZED APPROACH //searching existing trie is at most O(n) time
//must have O(n) space
//i think building the trie should be O(n) time as well


//hold all tries here
const tries = {};

//build a trie
function buildTrie(text) {
	const trie = {};
	text = text.toLowerCase();

	for (let i = 0; i < text.length; i++) {
		let node = trie;
		const starting = i;

		while (text[i] && text[i] !== " " && text[i] !== "," && text[i] !== ".") {
			const char = text[i];
			node[char] = node[char] || { indexes: [] };
			node[char].indexes.push(starting);
			node = node[char];
			i++;
		}
	}

	return trie;
}

//make or find the trie for the book
function findOrCreateTrie(book) {
	if (!tries.hasOwnProperty(book.id)) {
		tries[book.id] = buildTrie(book.text);
	}

	return tries[book.id];
}

//take advantage of the above and use this baby
function findWordsStartingWith(book, prefix) {
	prefix = prefix.toLowerCase();
	const trie = findOrCreateTrie(book);
	let node = trie;

	for (let i = 0; i < prefix.length; i++) {
		const char = prefix[i];
		node = node[char];
		if (!node) return [];
	}

	return node.indexes;
}

//test cases:
const book = {
	id: 1,
	text: `Once upon a time, there was a book with words.
  The book had not been catalogued, but would catch the
  eyes of onlookers nonetheless.`
};

// findWordsStartingWith(book, 'the'); // should return [ 18, 49, 99 ]
// findWordsStartingWith(book, "cat"); // should return [ 71, 93 ]


