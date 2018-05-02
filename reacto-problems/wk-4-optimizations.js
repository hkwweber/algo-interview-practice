// Prompt
// Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they needn't be sorted.
// You can assume that each array has only unique values (no duplicates within the array).

function intersection(arr1, arr2) {
  //O(n+m) time
  let pointer1 = 0,
    pointer2 = 0,
    results = [];
  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    if (arr1[pointer1] === arr2[pointer2]) {
      results.push(arr1[pointer1]);
      pointer1++;
      pointer2++;
    } else if (arr1[pointer1] < arr2[pointer2]) pointer1++;
    else pointer2++;
  }
  return results;
}

// Follow-up: now consider what you might do if the given arrays are not sorted.

function intersection(arr1, arr2) { //O(n+m) time still, but now O(n) space as well where n is the length of the smaller array
  let larger = arr1.length > arr2.length ? arr1 : arr2,
    smaller = arr1.length < arr2.length ? arr1 : arr2,
    smallerSet = new Set(smaller);
  return larger.filter(num => smallerSet.has(num));
}
