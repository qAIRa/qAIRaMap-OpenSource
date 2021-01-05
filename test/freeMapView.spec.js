import { viewFreeMap } from '../src/views/freeMapView.js';
import { viewMap } from '../src/lib/HtmlComponents.js';
import { initialize } from "@googlemaps/jest-mocks";

beforeEach(() => {
    initialize();
  })

  
  test('viewFreeMap', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    require('../build/js/materialize.min.js')
    document.body.innerHTML = '<header></header>' + viewMap;
  expect(viewFreeMap().toString()).toBe('[object HTMLDivElement]');
  })