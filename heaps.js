/* MIN HEAP CONSTRUCTION ******************************************************************************

binary heap -
a binary tree that also:
*is complete - has to have all levels filled up completely except last level, which has to be filled left to right
*heap property - min heap or max heap - every node in the heap is smaller than or equal (if min heap) to its children nodes' values
*is in not necessarily sorted
*can be represented well in an array:

if currentnode is at i:
left child is 2i + 1
right child is 2i + 2
so each node's parent is at (i-1)/2 rounded down


implement a min heap class. the class should support insertion, removal (of the minimum/root value), peeking (of the minimum/ root value), as well as sifting a value up and down the heap and building the heap from an input array. the heap should be represented as an array
*/

//partial implementation - all work except buildHeap
class MinHeap {
	constructor(array) {
		this.heap = this.buildHeap(array);
	}

	buildHeap(array) {
		this.heap = array;
		let firstParentIdx = Math.floor(array.length - 2 / 2);
		for (let i = firstParentIdx; i >= 0; i--) {
			let parentIdx = Math.floor((i - 1) / 2);
			let parent = array[parentIdx];
			if (parent) this.siftDown(parent, parentIdx);
		}
		return array;
	}

	siftDown() {
		let toSiftIdx = 0,
			left = 1,
			right = 2,
			minIdx = this.heap[right] < this.heap[left] ? right : left;
		while (this.heap[minIdx] && this.heap[toSiftIdx] < this.heap[minIdx]) {
			this.swap(toSiftIdx, minIdx);
			toSiftIdx = minIdx;
			left = 2 * toSiftIdx + 1;
			right = 2 * toSiftIdx + 2;
			minIdx = this.heap[right] < this.heap[left] ? right : left;
		}
	}

	swap(idx1, idx2) {
		let temp = this.heap[idx1];
		this.heap[idx1] = this.heap[idx2];
		this.heap[idx2] = temp;
	}

	siftUp() {
		let toSiftIdx = this.heap.length - 1;
		let parentIdx = Math.floor((toSiftIdx - 1) / 2);
		while (
			this.heap[parentIdx] &&
			this.heap[toSiftIdx] < this.heap[parentIdx]
		) {
			this.swap(toSiftIdx, parentIdx);
			//reassign indeces and parent
			toSiftIdx = parentIdx;
			parentIdx = Math.floor((toSiftIdx - 1) / 2);
		}
	}

	peek() {
		return this.heap[0];
	}

	remove() {
		this.swap(0, this.heap.length - 1);
		let toRemove = this.heap.pop();
		this.siftDown();
		return toRemove;
	}

	insert(value) {
		this.heap.push(value);
		this.siftUp();
	}
}
