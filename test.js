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

foo();

/*
test2
 */

function fib() {
  _fib(0, 1);
}

function _fib(_pre, _cur) {

  var CallSites = stackTrace.get();

  CallSites.forEach(function (callsite) {
    console.log('type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
  });

  var pre = _cur;
  var cur = pre + _pre;
  _fib(pre, cur);
}

//fib();

/*
test3
 */

function* fibonacci() {

  var CallSites = stackTrace.get();

  CallSites.forEach(function (callsite) {
    console.log('type: %s, function: %s, method: %s, filename: %s, line: %s, column: %s',
      callsite.getTypeName(), callsite.getFunctionName(), callsite.getMethodName(), callsite.getFileName(),
      callsite.getLineNumber(), callsite.getColumnNumber());
  });

  let pre = 0,
    cur = 1,
    tmp;
  yield pre;
  yield cur;
  while (true) {
    tmp = pre + cur;
    pre = cur;
    cur = tmp;
    yield cur;
  }
}

// setInterval(function () {
//   //console.log(fibonacci().next());
//   fibonacci().next();
// }, 10000);