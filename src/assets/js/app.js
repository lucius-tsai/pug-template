import Print from './print.js';

import { cube } from './math.js';

console.log(cube, cube())

console.log(Print())

async function getComponent() {
  
  const element = document.createElement('div');
  // const { default: _ } = await import(/* webpackChunkName: "lodash"*/ 'lodash');
    element.innerHTML = [
      'HELLO', 'WEBPACK',
      '5 Cube is Equal to ' + cube(5)
    ].join('\n\n');
    element.onclick = Print.bind(null, 'Hello webpack!');
    console.log(element)
    return element
  
}


getComponent.then(component=>{
  document.body.appendChild(component)
})