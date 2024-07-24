// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module');
const newC = new C();
console.log(newC.add(1 , 2));

// exports
const {add, multiply} = require('./test-module-2');
console.log(multiply(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
// output
// hello from the module
// Log this beautiful text
// Log this beautiful text
// Log this beautiful text