import { viewFreeDrone } from '../src/views/freeMapDroneView.js';
import { viewMap } from '../src/lib/HtmlComponents.js';
import { initialize } from "@googlemaps/jest-mocks";
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()
beforeEach(() => {
    fetch.resetMocks()
    initialize();
  })

  
  test('viewFreeDrone', () => {
    google.maps.Map=jest.fn();
    google.maps.MapTypeId=jest.fn();
    google.maps.MapTypeId.ROADMAP=jest.fn();
    global.M = require('../build/js/materialize.min.js');
    document.body.innerHTML = '<header></header>' + viewMap;
  expect(viewFreeDrone().toString()).toBe('[object HTMLDivElement]');
  })