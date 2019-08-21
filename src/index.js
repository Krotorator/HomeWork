// Задание 1:

function returnFirstArgument(a) {
  return a;
}

// Задание 2

function sumWithDefaults(a, b = 100) {
  return a + b;
}

console.log(sumWithDefaults(10));

// Задание 3

function sum() {
  return 5 + 5;
}

function returnFnResult(fn) {
  return fn();
}

returnFnResult(sum);

// Задание 4

var f = returnCounter(10);

function returnCounter(num = 0) {
  var i = 0;
  return () => {
    i++;
    return num + i;
  };
}

console.log(f());

// Задание 5

function returnArgumentsArray() {
  var arr = [];
  for (var i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
}

console.log(returnArgumentsArray(1, 2, 3, 4));

// Задание 6

function bindFunction(fn, ...args) {
  return function() {
    return fn(...args);
  };
}

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction
};
