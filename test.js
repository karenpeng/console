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

  if (counter1 < 10) {

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

fib1();

console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------')
  /*
  test3
  Code below shows all the callsites in the stack from the first 10 calls of fibonacci
   */
function fib2() {
  _fib2(0, 1);
}

var counter2 = 0;

function _fib2(_pre, _cur) {
  var pre = _cur;
  var cur = _pre + _cur;

  if (counter2 < 10) {

    stack().forEach(function (callsite, i) {
      console.log('%s counter: %s, level: %s, pre: %s, cur: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
        new Array(i + 1).join(' '), counter2, i, pre, cur, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
        callsite.getLineNumber(), callsite.getColumnNumber());
    })

    counter2++;

    _fib2(pre, cur);
  }
}

fib2();

/*
test4
 */

/*
test5
 */

// function* fibonacci() {

//   var CallSites = stackTrace.get();

//   CallSites.forEach(function (callsite, i) {
//     console.log('%s level: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
//       new Array(i + 1).join(' '), i, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
//       callsite.getLineNumber(), callsite.getColumnNumber());
//   });

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
//   fibonacci().next();
// }, 10000);