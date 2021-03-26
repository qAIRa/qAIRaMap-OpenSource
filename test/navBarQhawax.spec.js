import { navBarQhawax} from '../src/lib/navBarQhawax.js';
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
	initialize();
})

test('navBarQhawax', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
	global.M = require('../build/js/materialize.min.js');
	document.body.innerHTML = '<header></header>';
	const map = new google.maps.Map(document.querySelector('#map'), {
	});
	map.addListener=jest.fn()
	map.fitBounds=jest.fn()
	map.getZoom=jest.fn()
	map.setZoom=jest.fn()
	map.markers = []
  expect(navBarQhawax(document,'<div></div>')).toBe(undefined);
  })