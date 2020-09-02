import { navBarClient } from '../src/lib/navBarClient.js';
import { viewBoard } from '../src/lib/HtmlComponents.js';

test('menu nav bar', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    const element = document.createElement('div')
    require('../build/js/materialize.min.js')
	expect(navBarClient(element, viewBoard)).toStrictEqual();
})