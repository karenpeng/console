var stack = require('callsite');

/*
test1
 */

function foo() {
  function bar() {

    stack.forEach(function (callsite) {
      console.log('type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
        callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
        callsite.getLineNumber(), callsite.getColumnNumber());
    });
  }
  bar();
}

//foo();

/*
test2
Code below shows all layers of the callsite on top of the stack
 */

function fib1() {
  _fib1(0, 1);
}

var counter1 = 0;

function _fib1(_pre, _cur) {

  var pre = _cur;
  var cur = pre + _pre;

  if (counter1 < 5) {

    //var callsite = CallSites[CallSites.length - 1]
    var callsite = stack()[0]

    var i = 0

    // CallSites.forEach(function (callsite, i) {
    console.log('%s counter: %s, level: %s, pre: %s, cur: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      new Array(i + 1).join(' '), counter1, i, pre, cur, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
    //  });

    counter1++;

    _fib1(pre, cur);
  }
}

console.log('All layers of the callsite on top of the stack:\n');

fib1();

console.log('\n-----------------------------------------------------------------------------------------------------------------------------------------------------------------------\n')
  /*
  test3
  Code below shows all the callsites in the stack from the first 5 calls of fibonacci
   */
function fib2() {
  _fib2(0, 1);
}

var counter2 = 0;

function _fib2(_pre, _cur) {
  var pre = _cur;
  var cur = _pre + _cur;

  if (counter2 < 5) {

    stack().forEach(function (callsite, i) {
      console.log('%s counter: %s, level: %s, pre: %s, cur: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
        new Array(i + 1).join(' '), counter2, i, pre, cur, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
        callsite.getLineNumber(), callsite.getColumnNumber());
    })

    counter2++;

    _fib2(pre, cur);
  }
}

console.log('All the callsites in the stack from the first 5 calls of fibonacci:\n');

fib2();

console.log('\n-----------------------------------------------------------------------------------------------------------------------------------------------------------------------\n')

/*
test4
trying es6 generator
 */
// var counter3 = 0;

// function* fibonacci() {

//   stack().forEach(function (callsite, i) {
//     console.log('%s counter: %s, level: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
//       new Array(i + 1).join(' '), counter3, i, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
//       callsite.getLineNumber(), callsite.getColumnNumber());
//   });

//   counter3++;

//   let pre = 0,
//     cur = 1,
//     tmp;
//   yield pre;
//   yield cur;
//   while (true) {
//     tmp = pre + cur;
//     pre = cur;
//     cur = tmp;
//     yield cur;
//   }
// }

// setInterval(function () {
//   //console.log(fibonacci().next());
//   //fibonacci().next();
// }, 10000);

/*
test5
try a more complicated function binary search
 */
var counter4 = 0;

function doSearch(array, targetValue) {
  var min = 0;
  var max = array.length - 1;
  var guess = Math.floor((max + min) / 2);
  var arr = array;

  stack().forEach(function (callsite, i) {
    console.log('%s counter: %s, level: %s, guess: %s, arr: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      new Array(i + 1).join(' '), counter4, i, guess, arr, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
  })

  counter2++;

  if (max < 1) return -1;

  if (array[guess] === targetValue) {

    return guess;

  } else if (array[guess] > targetValue) {

    arr = array.slice(min, guess - 1);

  } else {

    arr = array.slice(guess, max);
  }

  doSearch(arr, targetValue);

  //return -1;
};

var test4 = [2, 2, 4, 6, 6, 6, 7, 13, 15, 64, 64, 246, 346];

console.log(doSearch(test4, 6));