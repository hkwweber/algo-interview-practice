/*BUBBLE SORT ****************************************************************
takes an array and returns a sorted version. use the bubble sort algo
bubble sort: repeatedly steps through the list, compares each pair of adjacent items and swaps them if they're in the wrong order. the pass through the list is repeated until no swaps are needed
named for the way smaller or larger elements 'bubble' to the top of the list
slow sort, but can be practical if the input is in mostly sorted order with some out of order elements nearly in position
*/

//space complexity: O(1)
//time complexity:
//best case is O(n) (if the array is sorted already)
//worst case: O(n^2)
function bubbleSort(array) { //O(1) space
	let isSorted = false;
	let countLoops = 0; //every time we iterate through, we can look at one less element from the end, bc each time the largest num should bubble to the right
	while (!isSorted) { //unknown time complexity
		isSorted = true;
		for (let i = 0; i < array.length-countLoops; i++) { //O(n)
		let temp;
			if (array[i] > array[i+1]) {
				isSorted = false;
				temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;
			}
		}
		countLoops++;
	}
	return array;
}


/*INSERTION SORT:
insertion sort definition:
builds the final sorted array one item at a time. less efficient on large lists than more advanced algorithms, however: it's simple, efficient if the data set is really really small
is
quadratic time complexity, but more efficinet in practice than most other quadratic sorting algos (like bubble sort)
*/

function insertionSort(array) { //O(n^2) time, O(1) space (since we're doing this in place)
	//loop through the entire array
  for (var i = 0; i < array.length; i++) { //O(n)
    let current = array[i];
		let j = i - 1;
		//this loop iterates through the 'sorted' part of the array that's
		//to the left of i. move left in that part of the array until we reach the
		//end of it. while array[j] is still greater than current, move it up one
		//position in the array.
		while (j > - 1 && array[j] > current) { //O(n)
			array[j + 1] = array[j];
			j--;
		}
		//after you've broken out of this loop, insert current
    array[j + 1] = current;
  }
  return array;
}

/*
SELECTION SORT **********************
in place
O(n^2) time complexity
generally performs worse than insertion sort
it's very simple
divides input list into two parts: sublist of items already sorted and the sublist remaining to be sorted
finds the smallest element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundary one element to the right
*/

//same as prev time and space complexity - constant space, quadratic time (O(n^2))
function selectionSort(array) {
	let leftMostUnsortedPos = 0;
	while (leftMostUnsortedPos < array.length -1) { //O(n)
		let smallest = Infinity;
		let smallestIdx;
		for (let i = leftMostUnsortedPos; i < array.length; i++) { //O(n)
			if (array[i] < smallest) {
				smallest = array[i];
				smallestIdx = i;
			}
		}
		array[smallestIdx] = array[leftMostUnsortedPos];
		array[leftMostUnsortedPos] = smallest;
		leftMostUnsortedPos++;
	}
	return array;
}


/*
QUICK SORT ******************************
sometimes called partition exchange sort
when implemented well, can be 2-3 x faster than merge or heap sort
not stable - relative position of equivalent items is not preserved
on avg, takes O(n log n) time
worst case O(n^2) time

process:
-Pick an element, called a pivot, from the array.
-Partitioning: reorder the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way). After this partitioning, the pivot is in its final position. This is called the partition operation.
-Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

every time we pick a pivot, it's the first value of the array

time complexity
- worst case: if your partition separates your array into one tiny array and one very long array, you're essentially running in n^2 time
- best case: if your partition divides your array in half every single time - O(n log n). avg case is the same
*/
