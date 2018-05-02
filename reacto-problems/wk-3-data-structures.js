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
