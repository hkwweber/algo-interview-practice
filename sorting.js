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
