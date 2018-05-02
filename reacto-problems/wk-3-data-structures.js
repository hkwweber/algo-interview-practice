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
