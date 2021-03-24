import { flightsView } from '../src/views/flightsView.js'

test('flight view page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    global.M = require('../build/js/materialize.min.js');
	expect(flightsView().toString()).toMatch(``);
})