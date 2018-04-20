/*
Award Budget Cuts
The awards committee of your alma mater (i.e. your college/university) asked for your assistance with a budget allocation problem they’re facing. Originally, the committee planned to give N research grants this year. However, due to spending cutbacks, the budget was reduced to newBudget dollars and now they need to reallocate the grants. The committee made a decision that they’d like to impact as few grant recipients as possible by applying a maximum cap on all grants. Every grant initially planned to be higher than cap will now be exactly cap dollars. Grants less or equal to cap, obviously, won’t be impacted.

Given an array grantsArray of the original grants and the reduced budget newBudget, write a function findGrantsCap that finds in the most efficient manner a cap such that the least number of recipients is impacted and that the new budget constraint is met (i.e. sum of the N reallocated grants equals to newBudget).

Analyze the time and space complexities of your solution.

example:
 input:  grantsArray = [2, 100, 50, 120, 1000], newBudget = 190

 output: 47 # and given this cap the new grants array would be
            # [2, 47, 47, 47, 47]. Notice that the sum of the
            # new grants is indeed 190
*/

//lololol it bad
function findGrantsCap(grantsArray, newBudget) {
	//sort in desc order
	grantsArray = grantsArray.sort((a, b) => b > a);
	let currValue;
	let currentIdx;
	for (let i = 0; i < grantsArray.length; i++) {
		//loop through the array. at every value, try it out as the cap (there must be a better way to do this, but for now, just mapping the arr and replacing all greater values with the cap)
		currValue = grantsArray[i];
		currentIdx = i;
		let sum = grantsArray
			.map((el, index) => {
				if (index <= i) return currValue;
				else return el;
			})
			.reduce((total, el) => (total += el));
		//if we're under newBudget, stop searching - we've found our lower cap bound
		if (sum < newBudget) break;
		//if we have to be right at budget, great - return current value
		if (sum === newBudget) return currValue;
		//if ALL of the values are too big to be cap, just return newbudget/array length
		if (sum > newBudget && i === grantsArray.length - 1)
			return newBudget / grantsArray.length;
	}
	//add up the right half of the array (the half that will be under cap)
	let rightHalfSum = grantsArray
		.slice(currentIdx)
		.reduce((total, curr) => (total += curr));
	//find the remaining budget available after adding the right half together. divide it by the number of over-cap grants we have
	return (newBudget - rightHalfSum) / currentIdx;
}
