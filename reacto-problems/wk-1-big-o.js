/*
string permutations

Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words.

The array that is returned should only contain unique values and its elements should be in alphabetical order.
*/

function stringPermutations(str) {
	let arr = str.split("");
	let results = [];
	results.push([arr.shift()]);
	while (arr.length) {
		let letterToInsert = arr.shift();
		let tempResults = [];
		results.forEach(currentResult => {
			for (let i = 0; i <= currentResult.length; i++) {
				let temp = currentResult.slice();
				temp.splice(i, 0, letterToInsert);
				tempResults.push(temp);
			}
		});
		results = tempResults;
	}
	return results
		.map(result => result.join(""))
		.filter((el, index, self) => self.indexOf(el) === index)
		.sort();
}

//examples:
stringPermutations("one");
// should return  [ 'eno', 'eon' 'neo', 'noe', 'oen', 'one']
stringPermutations("app");
// should return  [ 'app','pap','ppa']
stringPermutations("nn"); //should return  [ 'nn' ]
