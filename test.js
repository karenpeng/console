var stackTrace = require('stack-trace');
var trace = stackTrace.get();
require('assert').strictEqual(trace[0].getFileName(), __filename);

console.log(trace[0].getFileName(), __filename);

/*
test1
 */

function foo() {
  function bar() {
    var CallSites = stackTrace.get();

    CallSites.forEach(function (callsite) {
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
Code below shows all layers of the first callsite
 */

function fib() {
  _fib(0, 1);
}

var counter1 = 0;

function _fib(_pre, _cur) {

  var pre = _cur;
  var cur = pre + _pre;

  if (counter1 < 10) {

    var CallSites = stackTrace.get();

    //var callsite = CallSites[CallSites.length - 1]
    var callsite = CallSites[0]

    var i = 0

    // CallSites.forEach(function (callsite, i) {
    console.log('%s level: %s, pre: %s, cur: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      new Array(i + 1).join(' '), i, pre, cur, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
    //  });

    counter1++;

    _fib(pre, cur);
  }
}

fib();

/*
test3
Code below shows the last callste with all the layers
 */
function fib() {
  _fib(0, 1);
}

var counter2 = 0;

function _fib(_pre, _cur) {
  var pre = _cur;
  var cur = _pre + _cur;

  if (counter2 < 10) {

    var CallSites = stackTrace.get();
    CallSites.forEach(function (callsite, i) {
      console.log('%s counter: %s, level: %s, pre: %s, cur: %s, type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
        new Array(i + 1).join(' '), counter2, i, pre, cur, callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
        callsite.getLineNumber(), callsite.getColumnNumber());
    })

    counter2++;

    _fib(pre, cur);
  }
}

fib();

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