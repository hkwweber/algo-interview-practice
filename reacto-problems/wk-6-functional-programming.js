// implement a spyOn function which does the following:
// Takes a function func as its parameter
// Returns a spy function spy that takes any number of arguments
// spy calls func with the given arguments and returns what func returns
// spy has the following methods:
// .getCallCount(): returns the number of times spy has been called
// .wasCalledWith(val): returns true if spy was ever called with val, else returns false
// .returned(val): returns true if spy ever returned val, else returns false

function spyOn(func) {
  let callCount = 0;
  let argVals = new Set();
  let returnVals = new Set();
  function spy(arg1, arg2) {
    callCount++;
    [...arguments].forEach(arg => argVals.add(arg));
    const result = func(...arguments);
    returnVals.add(result);
    return result;
  }
  spy.getCallCount = function() {
    return callCount;
  };
  spy.wasCalledWith = function(val) {
    return argVals.has(val);
  };
  spy.returned = function(val) {
    return returnVals.has(val);
  };
  return spy;
}

// Example -- Keep in mind that not all functions take only two arguments…

function adder(n1, n2) {
  return n1 + n2;
}

const adderSpy = spyOn(adder);
adderSpy.getCallCount(); // 0
adderSpy(2, 4); // returns 6
adderSpy.getCallCount(); // 1
adderSpy(3, 5); // returns 8
adderSpy.getCallCount(); // 2/
adderSpy.wasCalledWith(2); // true
adderSpy.wasCalledWith(0); // false
adderSpy.returned(6); // true
adderSpy.returned(9); // false
