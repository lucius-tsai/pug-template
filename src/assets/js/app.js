import Print from './print.js';
import { cube } from './test/math.js';
import _ from 'lodash';
console.log(_)
console.log(cube(3))
console.log('111')
Print()
console.log('333')

import("./module-1").then(mod => {
  const nothing = mod.default();
  const nothingToo = mod.useless();

  // logs "This function does nothing and neither this one!"
  console.log(`${nothing} and ${nothingToo}`); 
});