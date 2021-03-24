import { simulationView } from '../src/views/simulationDrone.js'
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
  })

test('simulate flight view page', () => {
    document.body.innerHTML = `
    <header></header>
      <div id="content-page"></div>
    `;
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    global.M = require('../build/js/materialize.min.js');
	expect(simulationView().toString()).toMatch(``);
})