import { navBarQhawax } from '../src/lib/navBarQhawax.js';
import { viewBoard } from '../src/lib/HtmlComponents.js';
// import io from '../build/js/socket.io.min.js';
test('menu nav bar', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    // jest.mock('connect', () => jest.fn(() => {}));
    // io.connect= () => jest.fn(() => {})
    // connect=require('../build/js/socket.io.min.js')
    // global.connect=require('../build/js/socket.io.min.js')
    const element = document.createElement('div')
    global.M = require('../build/js/materialize.min.js');
	expect(navBarQhawax(element, viewBoard)).toStrictEqual();
})