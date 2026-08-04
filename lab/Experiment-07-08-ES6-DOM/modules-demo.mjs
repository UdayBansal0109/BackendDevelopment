// ES6 import of named and default exports
// Run with:  node modules-demo.mjs
import divide, { add, multiply } from './mathUtils.mjs';

console.log('add(2, 3) =', add(2, 3));
console.log('multiply(4, 5) =', multiply(4, 5));
console.log('divide(10, 2) =', divide(10, 2));
console.log('divide(1, 0) =', divide(1, 0));
